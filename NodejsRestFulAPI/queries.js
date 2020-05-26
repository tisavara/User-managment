const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'USERMANAGE',
  password: '1234',
  port: 5432,
})