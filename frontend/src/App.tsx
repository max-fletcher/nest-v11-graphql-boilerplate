import { useState } from "react";
import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import type {
  CreateAuthorData,
  CreateAuthorVars,
  CreateBookData,
  CreateBookVars,
  GetAuthorsData,
  GetAuthorsVars,
  GetBooksData,
  GetBooksVars,
} from "./types";

// AUTHORS QUERIES:
const GET_AUTHORS: TypedDocumentNode<GetAuthorsData, GetAuthorsVars> = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

// AUTHORS MUTATIONS:
const CREATE_AUTHOR: TypedDocumentNode<CreateAuthorData, CreateAuthorVars> =
  gql`
    mutation CreateAuthor($createAuthorInput: CreateAuthorInput!) {
      createAuthor(createAuthorInput: $createAuthorInput) {
        id
        name
      }
    }
  `;

// BOOKS QUERIES:
const GET_BOOKS: TypedDocumentNode<GetBooksData, GetBooksVars> = gql`
  query GetBooks {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

// BOOKS MUTATIONS:
const CREATE_BOOK: TypedDocumentNode<CreateBookData, CreateBookVars> = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      id
      title
      authorId
      author {
        id
        name
      }
    }
  }
`;

function App() {
  // Hooks for handling data fetching/refrshing etc:

  // AUTHORS:
  const {
    data: getAuthorsData,
    error: getAuthorsError,
    loading: getAuthorsLoading,
    refetch: getAuthorsRefetch,
  } = useQuery(GET_AUTHORS);
  const [createAuthor] = useMutation(CREATE_AUTHOR);
  const [authorName, setAuthorName] = useState("");

  const handleCreateAuthor = async () => {
    await createAuthor({
      variables: { createAuthorInput: { name: authorName } },
    });
    setAuthorId("");
    getAuthorsRefetch();
  };

  // BOOKS:
  const {
    data: getBooksData,
    error: getBooksError,
    loading: getBooksLoading,
    refetch: getBooksRefetch,
  } = useQuery(GET_BOOKS);
  const [createBook] = useMutation(CREATE_BOOK);
  const [bookTitle, setBookTitle] = useState("");
  const [authorId, setAuthorId] = useState("");

  const handleCreateBook = async () => {
    await createBook({
      variables: { createBookInput: { title: bookTitle, authorId } },
    });
    setBookTitle("");
    setAuthorId("");
    getBooksRefetch();
  };

  if (getBooksLoading) return <p>Loading...</p>;

  if (getBooksError) return <p>Error loading books: {getBooksError.message}</p>;

  if (!getBooksData)
    return <p>Failed to load books. Please check your network connectivity.</p>;

  return (
    <>
      <div>
        <h1>Authors</h1>
        <ul>
          {getAuthorsData?.authors.map((a) => (
            <>
              <li key={a.id}>{a.id}</li>
              <li key={a.id + a.name}>{a.name}</li>
            </>
          ))}
        </ul>
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author name"
        />
        <button onClick={handleCreateAuthor}>Add Author</button>
      </div>
      <div style={{ marginTop: "40px" }}>
        <h1>Books</h1>
        <ul>
          {getBooksData.books.map((b) => (
            <>
              <li key={b.id}>{b.id}</li>
              <li key={b.id + b.title}>
                {b.title} — {b.author.name}
              </li>
            </>
          ))}
        </ul>
        <input
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Title"
        />
        {/* <input
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          placeholder="Author"
        /> */}
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option value="" disabled>
            Select an author
          </option>
          {getAuthorsData?.authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <button onClick={handleCreateBook}>Add Book</button>
      </div>
    </>
  );
}

export default App;
