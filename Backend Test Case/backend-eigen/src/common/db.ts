import mysql from 'mysql2/promise';
import ENV from '@src/common/ENV';  // Import your ENV configuration

const pool = mysql.createPool({
  host: ENV.DatabaseHost,
  user: ENV.DatabaseUser,
  database: ENV.DatabaseName,
});

export default pool;