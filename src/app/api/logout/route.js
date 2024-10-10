import { cookies } from 'next/headers';  // 쿠키를 사용해 세션 관리

export async function POST() {
  // 쿠키에서 JWT를 제거
  cookies().set('token', '', { maxAge: -1 });

  return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 });
}
