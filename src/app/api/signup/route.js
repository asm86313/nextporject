import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

export async function POST(request) {
  const { email, password, name } = await request.json();

  // 비밀번호 해싱
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // MySQL 데이터베이스 연결
  const connection = await mysql.createConnection({
    host:"database-2.cpk6k6ga056w.ap-northeast-2.rds.amazonaws.com",
    user:"admin",
    password:"12345678",
    port:"3306",
    database:"management"
  });

  try {
    // SQL 쿼리 실행 - 데이터 저장
    const [result] = await connection.execute(
      'SELECT * FROM customer'
    );
    // 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    console.log(result)

    // 성공 메시지 응답
    return new NextResponse(JSON.stringify({ message: '회원가입 성공' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error saving user:', error);
    return new NextResponse(JSON.stringify({ message: '회원가입 실패' }), {
      status: 500,
    });
  } finally {
    // 데이터베이스 연결 종료
    await connection.end();
  }
}
