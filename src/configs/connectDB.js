import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    database: 'ctu_app'
})

export default pool;
