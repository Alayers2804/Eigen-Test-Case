import { isString } from 'jet-validators';

import schema from '@src/util/schema';
import { isRelationalKey } from '@src/util/validators';


/******************************************************************************
                                  Types
******************************************************************************/

export interface IUser {
  code: string;
  name: string;
}


/******************************************************************************
                                 Setup
******************************************************************************/

const User = schema<IUser>({
  code: isRelationalKey,
  name: isString,
});


/******************************************************************************
                                Export default
******************************************************************************/

export default User;