import { isNumber, isString } from 'jet-validators';


/**
 * Database relational key.
 */
export function isRelationalKey(arg: unknown): arg is string {
  return isString(arg) && /^-?\d+$/.test(arg) && Number(arg) >= -1;
}
