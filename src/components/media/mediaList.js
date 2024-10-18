'use client'; // 클라이언트 컴포넌트로 선언

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectValue } from '../../app/slices/providerSlice';

import css from './mediaList.module.css';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';


export default function MediaList() {
  const initialCode = [
    { src: '/images/img.png', alt: '이미지 1' },
    { src: '/images/img1.png', alt: '이미지 2' },
    { src: '/images/img.png', alt: '이미지 3' },
    { src: '/images/img1.png', alt: '이미지 4' },
    { src: '/images/img.png', alt: '이미지 5' },
    { src: '/images/img1.png', alt: '이미지 6' },
    { src: '/images/img.png', alt: '이미지 7' },
    { src: '/images/img1.png', alt: '이미지 8' },
  ];

  const [code, setCode] = useState(initialCode);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCode((prevCode) => {
          const updatedCode = [...prevCode];
          const firstItem = updatedCode.shift(); // 첫 번째 요소 제거
          updatedCode.push(firstItem); // 제거된 요소를 끝에 추가
          return updatedCode;
        });
      }, 3000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
  }, [isHovered]);


  return (
    <div
      className={css.container}
      onMouseEnter={() => setIsHovered(true)} // 마우스가 들어가면 자동 이동 시작
      onMouseLeave={() => setIsHovered(false)} // 마우스가 나가면 자동 이동 멈춤
    >

      {code.map((c, i) => {
        return (
          <div className={`${css.viewList} ${i === 0 ? css.mainView : ''}`}
          key={i}>
            <Image src={c.src} alt={c.alt} width={600} height={300} />
          </div>
        );
      })}
    </div>
  );
}