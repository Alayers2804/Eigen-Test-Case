import pool from '@src/common/db';
import { IBook } from '@src/models/Book';
import { RowDataPacket } from 'mysql2';

/**
 * Get all books.
 */
async function getAll(): Promise<IBook[]> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM books');
  return rows as IBook[];
}

/**
 * Get one book by code.
 */
async function getOne(code: string): Promise<IBook | null> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM books WHERE code = ?', [code]);
  return rows.length > 0 ? (rows[0] as IBook) : null;
}

/**
 * Check if a book exists by code.
 */
async function persists(code: string): Promise<boolean> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 FROM books WHERE code = ?', [code]);
  return rows.length > 0;
}

/**
 * Add a book.
 */
async function add(book: IBook): Promise<void> {
  await pool.query('INSERT INTO books (code, title, author, stock) VALUES (?, ?, ?, ?)', 
    [book.code, book.title, book.author, book.stock]);
}

/**
 * Update a book.
 */
async function update(book: IBook): Promise<void> {
  await pool.query('UPDATE books SET title = ?, author = ?, stock = ? WHERE code = ?', 
    [book.title, book.author, book.stock, book.code]);
}

async function updateStock(code: string, stock: number): Promise<void> {
    await pool.query('UPDATE books SET stock = ? WHERE code = ?', [stock, code]);
  }

/**
 * Delete a book by code.
 */
async function delete_(code: string): Promise<void> {
  await pool.query('DELETE FROM books WHERE code = ?', [code]);
}

export default {
  getAll,
  getOne,
  persists,
  add,
  update,
  delete: delete_,
} as const;
