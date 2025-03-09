import { isString, isBoolean } from 'jet-validators';
import schema from '@src/util/schema';
import { isRelationalKey } from '@src/util/validators';

/******************************************************************************
                                  Types
******************************************************************************/

export interface IUser {
  code: string;
  name: string;
  penaltyUntil?: string;  // Store date as string (ISO format)
  penaltyStatus?: boolean;
}

/******************************************************************************
                                 Setup
******************************************************************************/

const isDateString = (value: unknown): value is string =>
  typeof value === 'string' && !isNaN(Date.parse(value));

const User = schema<IUser>({
  code: isRelationalKey,
  name: isString,
  penaltyUntil: {
    vf: isDateString,
    default: new Date().toISOString(),  // Provide a valid default date
  },
  penaltyStatus: isBoolean,
});

/******************************************************************************
                                Export default
******************************************************************************/

export default User;
