import React, { useEffect, useRef, useState } from 'react';
import css from './swiper.module.css';

export default function Swiper(props) {

    console.log(props)
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesContainerRef = useRef(null);
    const slides = [
        { src: 'image1.png', alt: '이미지 1' },
        { src: 'image2.png', alt: '이미지 2' },
        { src: 'image3.png', alt: '이미지 3' },
        { src: 'image4.png', alt: '이미지 4' },
        { src: 'image5.png', alt: '이미지 5' },
    ];

    const slidesToShow = props.show; // 보여줄 슬라이드 개수

    useEffect(() => {
        const slideWidth = 100 / slidesToShow; // 각 슬라이드의 너비 계산

        // 각 슬라이드의 너비를 동적으로 설정
        const imageItems = document.querySelectorAll(`.${css.imageItem}`);
        imageItems.forEach(item => {
            item.style.minWidth = `${slideWidth}%`;
        });

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                return nextIndex >= slides.length ? 0 : nextIndex; // 마지막 슬라이드 후 첫 슬라이드로 돌아감
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const showSlides = () => {
        if (slidesContainerRef.current) {
            // 슬라이드 위치 업데이트
            slidesContainerRef.current.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;
        }
    };

    useEffect(() => {
        showSlides(); // currentIndex가 변경될 때마다 호출
    }, [currentIndex]);

    return (
        <div className={css.body}>
            <div className={css.imageSlider}>
                <div className={css.imageGrid} ref={slidesContainerRef}>
                    {slides.map((slide, index) => (
                        <div className={css.imageItem} key={index}>
                            <img className={css.img} src={slide.src} alt={slide.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
