import pool from '@src/common/db';
import { IUser } from '@src/models/User';
import { RowDataPacket } from 'mysql2';

/**
 * Get one user by code.
 */
async function getOne(code: string): Promise<IUser | null> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM members WHERE code = ?', [code]);
  return rows.length > 0 ? (rows[0] as IUser) : null;
}

/**
 * Check if a user exists by code.
 */
async function persists(code: string): Promise<boolean> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 FROM members WHERE code = ?', [code]);
  return rows.length > 0;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM members');
  return rows as IUser[];
}

/**
 * Add a user.
 */
async function add(user: IUser): Promise<void> {
  await pool.query('INSERT INTO members (code, name) VALUES (?, ?)', [user.code, user.name]);
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<void> {
  await pool.query('UPDATE members SET name = ? WHERE code = ?', [user.name, user.code]);
}

/**
 * Delete a user by code.
 */
async function delete_(code: string): Promise<void> {
  await pool.query('DELETE FROM members WHERE code = ?', [code]);
}

/**
 * Delete all users.
 */
async function deleteAllUsers(): Promise<void> {
  await pool.query('DELETE FROM members');
}

/**
 * Insert multiple users.
 */
async function insertMult(users: IUser[]): Promise<IUser[]> {
  const values = users.map(user => [user.code, user.name]);
  await pool.query('INSERT INTO users (code, name) VALUES ?', [values]);
  return users;
}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  deleteAllUsers,
  insertMult,
} as const;
