export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

export type NewsMutation = Omit<News, 'content'>;

export type ApiNews = Omit<News, 'id' | 'createdAt'>;

export interface Comments {
  id: number;
  newsId: number;
  author: string;
  content: string;
}

export type CommentsWithoutId = Omit<Comments, 'id'>;