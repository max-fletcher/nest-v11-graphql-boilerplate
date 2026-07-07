// AUTHOR:
type Author = {
  id: string;
  name: string;
};

export type GetAuthorsData = {
  authors: Author[];
};

export type GetAuthorsVars = Record<string, never>;

export type CreateAuthorData = {
  createAuthor: Author;
};

export type CreateAuthorVars = {
  createAuthorInput: { name: string };
};

// BOOKS:
type Book = {
  id: string;
  title: string;
  author: Author;
};

export type GetBooksData = {
  books: Book[];
};

export type GetBooksVars = Record<string, never>;

export type CreateBookData = {
  createBook: Book;
};

export type CreateBookVars = {
  createBookInput: { title: string; authorId: string };
};
