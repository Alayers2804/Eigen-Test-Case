import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';

import { NodeEnvs } from './constants';


/******************************************************************************
                                 Setup
******************************************************************************/

const ENV = jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Port: num,
  DatabaseName: str,
  DatabaseUser: str,
  DatabaseHost: str,
});


/******************************************************************************
                            Export default
******************************************************************************/

export default ENV;
