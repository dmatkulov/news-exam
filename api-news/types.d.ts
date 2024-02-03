export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

export type NewWithoutId = Omit<News, 'id'>;

export interface Comments {
  id: number;
  newsId: number;
  author: string;
  content: string;
}

export type CommentsWithoutId = Omit<Comments, 'id'>;