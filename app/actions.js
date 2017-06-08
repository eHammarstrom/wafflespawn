export const ADD_USER_BOOKS = "ADD_USER_BOOKS";

export function addUserBooks(books) {
  return { type: ADD_USER_BOOKS, books };
}