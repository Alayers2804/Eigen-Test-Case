import { RouteError } from '@src/common/route-errors';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/MemberRepo';
import { IUser } from '@src/models/User';


/******************************************************************************
                                Variables
******************************************************************************/

export const USER_NOT_FOUND_ERR = 'User not found';


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  return await UserRepo.getAll();
}

/**
 * Add one user.
 */
async function addOne(user: IUser): Promise<void> {
  await UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<void> {
  const exists = await UserRepo.persists(user.code);  // Changed from `id` to `code`
  if (!exists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  await UserRepo.update(user);
}

/**
 * Delete a user by their code.
 */
async function _delete(code: string): Promise<void> {  // Changed from `id` to `code`
  const exists = await UserRepo.persists(code);
  if (!exists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  await UserRepo.delete(code);
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
