"use client"

import React, { useEffect, useRef, useState } from 'react';
import css from './swiper.module.css';
import Image from 'next/image';

export default function Swiper(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesContainerRef = useRef(null);
    const [slides, setSlides] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(6); // 보여줄 슬라이드 개수
    const [speed, setSpeed] = useState(3000); // 보여줄 슬라이드 개수
    const [slideWidth, setSlideWidth] = useState(25);
    const [inter, setInter] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        setSlides(props.code); // props.code가 있을 경우 슬라이드 설정
        setSlidesToShow(props.show); // 보여줄 슬라이드 개수 설정
        setSpeed(props.speed)
        setShowButton(props.showButton)
    }, []);

    useEffect(() => {
        if(inter) {
            setPlayStatus(false);
        } else {
            setPlayStatus(true);
        }
    }, [inter]);

    useEffect(() => {
        setSlideWidth(100/slidesToShow); // 각 슬라이드의 너비 계산

            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    slides.push(slides[prevIndex])
                    const nextIndex = prevIndex + 1;
                    return nextIndex;
                });
            }, speed);
            setInter(interval)

        return () => clearInterval(interval);
    }, [slides.length, slidesToShow]);

    const preSwiper = () => {
        if (inter) {
            clearInterval(inter)
            setInter(null)
        }
        let _currentIndex = currentIndex
        slidesContainerRef.current.style.transform = `translateX(-${((_currentIndex - 1) * (100 / slidesToShow))}%)`;
        if (_currentIndex > 0) {
            setCurrentIndex(_currentIndex - 1)
        }
    };

    const nextSwiper = () => {
        if (inter) {
            clearInterval(inter)
            setInter(null)
        }
        console.log("inter", inter)
        let _currentIndex = currentIndex
        if(_currentIndex < (slides.length - slidesToShow)) {
            slidesContainerRef.current.style.transform = `translateX(-${((_currentIndex + 1) * (100 / slidesToShow))}%)`;
            setCurrentIndex(_currentIndex + 1)
        }
    };

    const showSlides = () => {
        if (slidesContainerRef.current) {
            // 슬라이드 위치 업데이트
            slidesContainerRef.current.style.transform = `translateX(-${(currentIndex * (100 / slidesToShow))}%)`;
        }
    };

    const stopAndGoSlides = () => {
        if (inter) {
            clearInterval(inter)
            setInter(null)
        } else {
            setCurrentIndex(prevIndex => {
                slides.push(slides[prevIndex])
                const nextIndex = prevIndex + 1;
                return nextIndex;
            });
        }
    };

    useEffect(() => {
        showSlides();
    }, [currentIndex]);


    return (
        <div className={css.body}>
            <div className={css.sliderWrap}>
                <div className={css.imageSlider}>
                    <div className={css.imageGrid} ref={slidesContainerRef}>
                        {slides.map((slide, index) => ( // 복제된 슬라이드로 변경
                            <div className={css.imageItem} key={index}  style={{ width: `${slideWidth}%` }}>
                                <Image src={slide.src} alt={slide.alt} width={600} height={300}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            { showButton &&
                <div className={css.buttonWrap}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" type="button" onClick={preSwiper}>{'<'}</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" type="button" onClick={stopAndGoSlides}>{playStatus ? '>' : '||' }</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" type="button" onClick={nextSwiper}>{'>'}</button>
                </div>
            }
        </div>
    );
}
