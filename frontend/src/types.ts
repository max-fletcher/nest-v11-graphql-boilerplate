export type Book = {
  id: string;
  title: string;
  author: string;
};

export type GetBooksData = {
  books: Book[];
};

export type GetBooksVars = Record<string, never>;

export type CreateBookData = {
  createBook: Book;
};

export type CreateBookVars = {
  createBookInput: { title: string; author: string };
};
