import {Router} from 'express';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import mysqlDb from '../mysqlDb';
import {CommentsWithoutId} from '../types';
import {imageUpload} from '../multer';

const commentsRouter = Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const newsId = req.query.news_id;
    
    let query = 'SELECT * FROM comments';
    
    if (newsId !== undefined) {
      query += ' WHERE news_id = ?';
    }
    
    const [results] = await mysqlDb.getConnection().query(
      query, [newsId]) as RowDataPacket[];
    
    res.send(results);
    
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    const newsId = req.body.newsId;
    const content = req.body.content;
    
    if (!content || !newsId) {
      return res.status(422).send({error: 'News ID or comment content must be present'});
    }

    const comment: CommentsWithoutId = {
      newsId: parseInt(newsId),
      author: req.body.author ? req.body.author : 'Anonymous',
      content: req.body.content,
    };
    
    const [newsResult] = await mysqlDb.getConnection().query('' +
      'SELECT * FROM news WHERE id = ? ', [newsId]) as RowDataPacket[];

    const existingNews = newsResult[0];

    if (!existingNews) {
      return res.status(404).send({error: 'News not found'});
    }

    const [results] = await mysqlDb.getConnection().query(
      'INSERT INTO comments (news_id, author, content)' +
      'VALUES (?, ?, ?)',
      [comment.newsId, comment.author, comment.content],
    ) as ResultSetHeader[];

    res.send({
      id: results.insertId,
      ...comment
    });
  } catch (e) {
    return next(e);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const commentId = req.params.id;
    
    const [results] = await mysqlDb.getConnection().query(
      'SELECT * FROM comments WHERE id = ? ', [commentId],
    ) as RowDataPacket[];
    
    const existingComment = results[0];
    
    if (!existingComment) {
      return res.status(404).send({error: 'Comment not found'});
    }
    
    await mysqlDb.getConnection().query(
      'DELETE FROM comments WHERE id = ? ', [commentId],
    );
    
    res.send({message: 'Comment deleted successfully'});
  } catch (e) {
    return next(e);
  }
})

export default commentsRouter;