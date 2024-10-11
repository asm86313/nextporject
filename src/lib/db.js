// lib/db.js
import mysql from 'mysql2/promise';

// 환경 변수에서 DB 설정 불러오기
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

let pool;

// 커넥션 풀을 전역 변수로 설정
if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database:DB_DATABASE,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // 커넥션 풀의 최대 연결 수
    queueLimit: 0,
  });
}

pool = global._mysqlPool;

export default pool;
