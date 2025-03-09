import { isNumber, isString } from 'jet-validators';

import schema from '@src/util/schema';
import { isRelationalKey } from '@src/util/validators';

/******************************************************************************
                                  Types
******************************************************************************/

export interface IBorrowRecord {
  uid?: string;
  member_code: string;
  book_code: string;
  borrow_date?: Date;
  return_date?: Date | null;
  penalty_until?: Date | null;
}

/******************************************************************************
                                 Setup
******************************************************************************/

const BorrowRecord = schema<IBorrowRecord>({
  uid: (val) => val === undefined || isString(val), // Allow undefined for optional fields
  member_code: isRelationalKey,
  book_code: isRelationalKey,
  borrow_date: (val) => val === undefined || val instanceof Date,
  return_date: (val) => val === undefined || val === null || val instanceof Date,
  penalty_until: (val) => val === undefined || val === null || val instanceof Date,
});

/******************************************************************************
                                Export default
******************************************************************************/

export default BorrowRecord;