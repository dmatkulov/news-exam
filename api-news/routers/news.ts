import {Router} from 'express';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {NewsWithoutId} from '../types';
import {imageUpload} from '../multer';

const newsRouter = Router();

newsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    
    if (!title || !content) {
      return res.status(422).send({error: 'Title and content must be present'});
    }
    
    const news: NewsWithoutId = {
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.filename : null
    };
    
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO news (title, content, image)' +
      'VALUES (?, ?, ?)',
      [news.title, news.content, news.image],
    ) as ResultSetHeader[];
    
    res.send({
      id: result.insertId,
      ...news,
      createdAt: new Date().toISOString(),
    });
    
  } catch (e) {
    next(e);
  }
});
newsRouter.get('/', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, title, image, created_at FROM news') as RowDataPacket[];
    res.send(results);
  } catch (e) {
    return next(e);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT * FROM news WHERE id = ? ',
      [req.params.id]
    ) as RowDataPacket[];
    
    const news = results[0];
    
    if (!news) {
      return res.status(404).send({error: 'News not found'});
    }
    
    res.send(news);
    
  } catch (e) {
    return next(e);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    const newsId = req.params.id;
    
    const [results] = await mysqlDb.getConnection().query(
      'SELECT * FROM news WHERE id = ? ',
      [newsId]
    ) as RowDataPacket[];
    
    const existingNews = results[0];
    
    if (!existingNews) {
      return res.status(404).send({error: 'News not found'});
    }
    
    await mysqlDb.getConnection().query(
      'DELETE FROM comments WHERE news_id = ? ', [newsId]
    );
    
    await mysqlDb.getConnection().query(
      'DELETE FROM news WHERE id = ? ', [newsId]
    );
    
    res.send({message: 'News deleted successfully'});
  } catch (e) {
    return next(e);
  }
});


export default newsRouter;