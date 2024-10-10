import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';  // 쿠키를 사용해 세션 관리



const SECRET_KEY = process.env.SECRET_KEY;  // 실제로는 환경 변수로 설정해야 합니다.



// 비밀번호 해싱 함수
async function hashPassword(password) {
  const saltRounds = 10; // 솔트 라운드 수 (높을수록 보안 강화, 하지만 속도 느려짐)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function POST(request) {
  const { email, password } = await request.json();

  // 가상의 데이터베이스에서 사용자 조회 (실제 구현에서는 DB에서 사용자 정보를 가져와야 함)
  const user = {
    email: 'test@example.com',
    passwordHash: await hashPassword('pasword1234'),  // 미리 해싱된 비밀번호
  };

  // 사용자 이메일 확인
  if (email !== user.email) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // 비밀번호 해시 비교
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // JWT 생성 (로그인 성공 시)
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  // JWT를 쿠키에 저장
  cookies().set('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 });

  return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
}
