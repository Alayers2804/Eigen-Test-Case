import { isNumber, isString } from 'jet-validators';
import { transform } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import BookService from '@src/services/BookService';
import Book from '@src/models/Book';

import { parseReq, IReq, IRes } from './common';


/******************************************************************************
                                Variables
******************************************************************************/

const Validators = {
  add: parseReq({ book: Book.test }),
  update: parseReq({ book: Book.test }),
  delete: parseReq({ code: transform(String, isString) }),  
} as const;


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all books.
 */
async function getAll(_: IReq, res: IRes) {
  const books = await BookService.getAll();
  res.status(HttpStatusCodes.OK).json({ books });
}

/**
 * Add a book.
 */
async function add(req: IReq, res: IRes) {
  const { book } = Validators.add(req.body);
  await BookService.addOne(book);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update a book.
 */
async function update(req: IReq, res: IRes) {
  const { book } = Validators.update(req.body);
  await BookService.updateOne(book);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete a book.
 */
async function delete_(req: IReq, res: IRes) {
  const { code } = Validators.delete(req.params);
  await BookService.delete(code);
  res.status(HttpStatusCodes.OK).end();
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
