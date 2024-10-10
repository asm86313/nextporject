import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Swiper from '../../components/swiper/swiper';

const SECRET_KEY = process.env.SECRET_KEY;  // 실제로는 환경 변수로 설정해야 합니다.

export async function getProducts() {
    const res = await axios.get('http://localhost:3000/api/list');
    const products = res;
    return products // 컴포넌트에 props로 전달
}

export default async function List() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    if (!token) {
        return <p>You need to log in to access the dashboard.</p>;
      }
      try {
        // JWT 검증
        const decoded = jwt.verify(token.value, SECRET_KEY);
        const products = await getProducts();
        const code = products.data.code
        const message = products.data.message
      return (
        <>
            {message && message}
            {code.length > 0 && <Swiper show={4} code={code} speed={1500}/>}
        </>
      );
      } catch (error) {
        return <p>Invalid session, please log in again.</p>;
      }

}