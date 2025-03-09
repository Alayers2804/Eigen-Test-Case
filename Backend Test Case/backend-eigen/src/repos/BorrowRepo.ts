import pool from '@src/common/db';
import { IBorrowRecord } from '@src/models/BorrowRecord';
import { RowDataPacket } from 'mysql2';


async function getAll(): Promise<IBorrowRecord[]> {
  const [rows] = await pool.query('SELECT * FROM borrow_records');
  return rows as IBorrowRecord[];
}

async function getByMember(member_code: string): Promise<IBorrowRecord[]> {
  const [rows] = await pool.query(
    'SELECT * FROM borrow_records WHERE member_code = ?',
    [member_code]
  );
  return rows as IBorrowRecord[];
}

async function getByUid(uid: string): Promise<IBorrowRecord | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM borrow_records WHERE uid = ?',
      [uid]
    );
    return rows.length ? (rows[0] as IBorrowRecord) : null;
  }


async function add(record: Omit<IBorrowRecord, 'id'>): Promise<void> {
    await pool.query(
      'INSERT INTO borrow_records (uid, member_code, book_code, borrow_date, return_date) VALUES (UUID(), ?, ?, ?, ?, ?)',
      [record.member_code, record.book_code, record.borrow_date, record.return_date]
    );
  }

  async function update(record: Partial<IBorrowRecord>): Promise<void> {
    await pool.query(
      'UPDATE borrow_records SET return_date = ? WHERE uid = ?',
      [record.return_date, record.uid]
    );
  }

async function isBookBorrowed(book_code: string): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT 1 FROM borrow_records WHERE book_code = ? AND return_date IS NULL',
      [book_code]
    );
    return rows.length > 0;
  }
  

async function countBooksBorrowed(member_code: string): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM borrow_records WHERE member_code = ? AND return_date IS NULL',
      [member_code]
    );
    return rows[0].count;
  }

  async function isMemberPenalized(member_code: string): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT 1 FROM members WHERE code = ? AND isPenalized = TRUE',
      [member_code]
    );
    return rows.length > 0;
}


async function getAvailableBooks(): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT * FROM books 
      WHERE code NOT IN (SELECT book_code FROM borrow_records WHERE return_date IS NULL)
    `);
    return rows;
  }
  

  async function getMembersWithBorrowedBooks(): Promise<{ member_code: string; name: string; borrowed_books: number }[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT m.code AS member_code, m.name, 
             COALESCE(COUNT(br.book_code), 0) AS borrowed_books 
      FROM members m
      LEFT JOIN borrow_records br ON m.code = br.member_code AND br.return_date IS NULL
      GROUP BY m.code, m.name
      ORDER BY borrowed_books DESC;
    `);
    return rows as { member_code: string; name: string; borrowed_books: number }[];
  }
  

export default {
  getAll,
  getByMember,
  getByUid,
  add,
  update,
  isBookBorrowed,
  countBooksBorrowed,
  isMemberPenalized,
  getAvailableBooks,
  getMembersWithBorrowedBooks,
} as const;
