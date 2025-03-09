import { isNumber, isString } from "jet-validators";

import schema from '@src/util/schema';
import { isRelationalKey } from "@src/util/validators";

export interface IBook {
    code: string;
    title: string;
    author: string;
    stock: number;
  }

const Book = schema<IBook>({
    code: isRelationalKey,
    title: isString,
    author: isString,
    stock: isNumber,
  });
  
export default Book;