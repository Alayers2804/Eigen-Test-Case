import jetSchema from 'jet-schema';
import { isNumber, isString, isBoolean } from 'jet-validators';
import { isRelationalKey } from './validators';

export default jetSchema({
  globals: [
    { vf: isRelationalKey, default: "-1" },  // Default relational key
    { vf: isNumber, default: 0 },           // Default number
    { vf: isString, default: '' },          // Default string
    { vf: isBoolean, default: false },      // Default boolean
  ],
});
