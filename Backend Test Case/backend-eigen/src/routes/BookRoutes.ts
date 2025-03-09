import { isString } from 'jet-validators';
import { transform } from 'jet-validators/utils';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import BookService from '@src/services/BookService';
import Book from '@src/models/Book';
import { parseReq, IReq, IRes } from './common';

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Get all books
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: List of books
 */
async function getAll(_: IReq, res: IRes) {
  const books = await BookService.getAll();
  res.status(HttpStatusCodes.OK).json({ books });
}

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Add a new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Harry Potter"
 *               author:
 *                 type: string
 *                 example: "J.K. Rowling"
 *     responses:
 *       201:
 *         description: Book added successfully
 */
async function add(req: IReq, res: IRes) {
  const { book } = parseReq({ book: Book.test })(req.body);
  await BookService.addOne(book);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * @swagger
 * /book:
 *   put:
 *     summary: Update an existing book
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
async function update(req: IReq, res: IRes) {
  const { book } = parseReq({ book: Book.test })(req.body);
  await BookService.updateOne(book);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * @swagger
 * /book/{code}:
 *   delete:
 *     summary: Delete a book by code
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 */
async function delete_(req: IReq, res: IRes) {
  const { code } = parseReq({ code: transform(String, isString) })(req.params);
  await BookService.delete(code);
  res.status(HttpStatusCodes.OK).end();
}

export default { getAll, add, update, delete: delete_ } as const;
