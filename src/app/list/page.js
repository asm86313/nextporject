import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Swiper from '../../components/swiper/swiper';
import css from './page.module.css'

const SECRET_KEY = process.env.SECRET_KEY;  // 실제로는 환경 변수로 설정해야 합니다.

export function createSwiperComponent(config) {
  return function CustomSwiper(props) {
      return <Swiper {...props} {...config} />;
  };
}

const Swiper1 = createSwiperComponent({ speed: 1000, show: 5, showButton: true });
const Swiper2 = createSwiperComponent({ speed: 3000, show: 3, showButton: false });

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
        <div className={css.container} >
          {code.length > 0 && <Swiper1 code={code} />}
          {code.length > 0 && <Swiper2 code={code} />}
        </div>
    </>
  );
  } catch (error) {
    return <p>Invalid session, please log in again.</p>;
  }
}