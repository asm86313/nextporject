"use client"

import React, { useEffect, useRef, useState } from 'react';
import css from './swiper.module.css';

export default function Swiper(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesContainerRef = useRef(null);
    const [slides, setSlides] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(4); // 보여줄 슬라이드 개수
    const [speed, setSpeed] = useState(3000); // 보여줄 슬라이드 개수

    useEffect(() => {
        setSlides(props.code); // props.code가 있을 경우 슬라이드 설정
        setSlidesToShow(props.show); // 보여줄 슬라이드 개수 설정
        setSpeed(props.speed)
    }, []);

    useEffect(() => {
        const slideWidth = 100 / slidesToShow; // 각 슬라이드의 너비 계산

        // 각 슬라이드의 너비를 동적으로 설정
        const imageItems = document.querySelectorAll(`.${css.imageItem}`);
        imageItems.forEach(item => {
            item.style.width = `${slideWidth}%`;
        });

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                return nextIndex >= slides.length + 1 ? 0 : nextIndex; // 마지막 슬라이드 후 첫 슬라이드로 돌아감
            });
        }, speed);

        return () => clearInterval(interval);
    }, [slides.length, slidesToShow]);

    const showSlides = () => {
        if (slidesContainerRef.current) {
            // 슬라이드 위치 업데이트
            slidesContainerRef.current.style.transform = `translateX(-${(currentIndex * (100 / slidesToShow))}%)`;
        }
    };

    useEffect(() => {
        showSlides(); // currentIndex가 변경될 때마다 호출
    }, [currentIndex]);


    return (
        <div className={css.body}>
            <div className={css.imageSlider}>
                <div className={css.imageGrid} ref={slidesContainerRef}>
                    {slides.map((slide, index) => ( // 복제된 슬라이드로 변경
                        <div className={css.imageItem} key={index}>
                            <img className={css.img} src={slide.src} alt={slide.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
