import { isString  } from 'jet-validators';
import { transform } from 'jet-validators/utils';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UserService from '@src/services/UserService';
import User from '@src/models/User';
import { parseReq, IReq, IRes } from './common';

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /member/all:
 *   get:
 *     summary: Get all users
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of users
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * @swagger
 * /member:
 *   post:
 *     summary: Add a new user
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *     responses:
 *       201:
 *         description: User added successfully
 */
async function add(req: IReq, res: IRes) {
  const { user } = parseReq({ user: User.test })(req.body);
  await UserService.addOne(user);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * @swagger
 * /member:
 *   put:
 *     summary: Update an existing user
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: User updated successfully
 */
async function update(req: IReq, res: IRes) {
  const { user } = parseReq({ user: User.test })(req.body);
  await UserService.updateOne(user);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * @swagger
 * /member/{code}:
 *   delete:
 *     summary: Delete a user by code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
async function delete_(req: IReq, res: IRes) {
  const { code } = parseReq({ code: transform(String, isString) })(req.params);
  await UserService.delete(code);
  res.status(HttpStatusCodes.OK).end();
}

export default { getAll, add, update, delete: delete_ } as const;
