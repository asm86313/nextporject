'use client'
import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function Home() {
  const [data, setData] = useState('');

  const handleSubmit = async () => {
setTimeout(async () => {
  try {
    // axios로 서버에 로그인 요청
    const res = await axios.get('http://localhost:3000/api/login');

    if (res.status === 200) {
      console.log('성공',res)
      setData(res.data.message)
    }
  } catch (error) {
    // 오류가 발생했을 때 메시지 설정
    console.log('실패',error)
  }
}, 500);

  };

  useEffect(()=> {
    handleSubmit();
  },[])


  return (
      <div>data:{data}</div>
    );

}




