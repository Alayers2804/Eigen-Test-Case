import { RouteError } from '@src/common/route-errors';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import BookRepo from '@src/repos/BookRepo';
import { IBook } from '@src/models/Book';


/******************************************************************************
                                Variables
******************************************************************************/

export const BOOK_NOT_FOUND_ERR = 'Book not found';


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all books.
 */
function getAll(): Promise<IBook[]> {
  return BookRepo.getAll();
}

/**
 * Add a book.
 */
function addOne(book: IBook): Promise<void> {
  return BookRepo.add(book);
}

/**
 * Update a book.
 */
async function updateOne(book: IBook): Promise<void> {
  const exists = await BookRepo.persists(book.code);
  if (!exists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      BOOK_NOT_FOUND_ERR,
    );
  }
  return BookRepo.update(book);
}

/**
 * Delete a book by its code.
 */
async function _delete(code: string): Promise<void> {
  const exists = await BookRepo.persists(code);
  if (!exists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      BOOK_NOT_FOUND_ERR,
    );
  }
  return BookRepo.delete(code);
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
