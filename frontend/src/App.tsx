import { useState } from "react";
import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import type {
  CreateBookData,
  CreateBookVars,
  GetBooksData,
  GetBooksVars,
} from "./types";

const GET_BOOKS: TypedDocumentNode<GetBooksData, GetBooksVars> = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const CREATE_BOOK: TypedDocumentNode<CreateBookData, CreateBookVars> = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      id
      title
      author
    }
  }
`;

function App() {
  const {
    data: getBooksData,
    error: getBooksError,
    loading: getBooksLoading,
    refetch: getBooksRefetch,
  } = useQuery(GET_BOOKS);
  const [createBook] = useMutation(CREATE_BOOK);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async () => {
    await createBook({ variables: { createBookInput: { title, author } } });
    setTitle("");
    setAuthor("");
    getBooksRefetch();
  };

  if (getBooksLoading) return <p>Loading...</p>;

  if (getBooksError) return <p>Error loading books: {getBooksError.message}</p>;

  if (!getBooksData)
    return <p>Failed to load books. Please check your network connectivity.</p>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {getBooksData.books.map((b) => (
          <li key={b.id}>
            {b.title} — {b.author}
          </li>
        ))}
      </ul>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
}

export default App;
