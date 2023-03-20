import Image from 'next/image';
import { ImgSlide, IconText } from 'components';
import arrrow from 'public/arrow.svg';
import { useSpring, config } from '@react-spring/web';
import { useSwipeable } from 'react-swipeable';
import imgArrowL from 'public/imgSliderArrowLeft.svg';
import imgArrowR from 'public/imgSliderArrowRight.svg';
import { useEffect, useState, useRef } from 'react';
import { useStore } from 'store/context';

// interface ImageSliderI {}

export default function ImageSlider2(): JSX.Element {
    const { state } = useStore();
    const bodyWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const [moveX, setMoveX] = useState<number>(0);
    const [foward, setForward] = useState<number>(0);

    const widthRef = useRef<HTMLDivElement>(null!);
    const nrRef = useRef<number>(state.imgObj.length);
    const gameLinkRef = useRef<string>('');
    const startZero = useRef<boolean>(false);
    const counter = useRef<number>(0);

    function nextSlide() {
        setForward(p => p + moveX);
        counter.current++;
    }

    function prevSlide() {
        setForward(p => p - moveX);
        counter.current--;
    }
    const style = useSpring({
        config: config.gentle,
        transform: `translateX(${foward}%)`,
        // marginLeft: counter.current === 0 && bodyWidth! <= 640 ? '10px' : '0px',
        boxShadow: '0px 0px 35px -16px rgba(54, 70, 76, 1)',
    });
    const styleOffsetImg = useSpring({
        config: config.gentle,
        transform: `translateX(${foward}%)`,
        opacity: 0.5,
    });

    useEffect(() => {
        if (window.innerWidth <= 766) {
            setForward(-Math.abs((7 / widthRef.current.offsetWidth) * 180));
            counter.current = 0;
        }
        if (window.innerWidth >= 766) {
            setForward(0);
            counter.current = 1;
        }
    // setForward(0);
    }, []);

    useEffect(() => {
    // console.log(Math.abs(8 / widthRef.current.offsetWidth), 'is-1');
    //--------SMALL-------//
        if (bodyWidth! <= 766 && counter.current !== -1) {
            setMoveX(-(Math.abs((7 / widthRef.current.offsetWidth) * 100) + 100));
        }
        // console.log(moveX, 'MOVEX');
        if (bodyWidth! <= 766 && counter.current > 0 && counter.current === nrRef.current) {
            // console.log('small');
            setForward(-Math.abs((7 / widthRef.current.offsetWidth) * 180));
            counter.current = 0;
            startZero.current = true;
        }
        if (bodyWidth! <= 766 && counter.current === -1) {
            setForward(-Math.abs((7 / widthRef.current.offsetWidth) * 6 * 100 + 501.5));
            counter.current = state.imgObj.length - 1;
            startZero.current = true;
        }
        //--------SMALL-------//

        //--------BIG-------//
        if (bodyWidth! > 766) {
            setMoveX(-(Math.abs((7 / widthRef.current.offsetWidth) * 100) + 100));
        }

        if (bodyWidth! >= 766 && counter.current > 0 && counter.current === nrRef.current) {
            setForward(100);
            counter.current = 0;
            startZero.current = true;
        }
        if (bodyWidth! >= 766 && counter.current === -1) {
            setForward(-400);
            counter.current = state.imgObj.length - 1;
            startZero.current = true;
        }
    //--------BIG-------//
    // console.log(counter.current, nrRef.current);
    }, [bodyWidth, foward, state.imgObj.length]);

    const handlersBox = useSwipeable({
        onSwipedLeft: () => {
            // console.log('left');
            nextSlide();
        },
        onSwipedRight: () => {
            // console.log('right');
            prevSlide();
        },
    });

    return (
        <div className="relative overflow-x-hidden ">
            <div className="absolute top-[50%] left-[50%] transform-gpu translate-x-[-50%] translate-y-[-50%] z-[90]">
                <div className="w-screen justify-around px-20 hidden md:flex">
                    <div onClick={prevSlide} className="cursor-pointer">
                        <Image src={imgArrowL} alt="arrow_left" width={80} height={80} />
                    </div>
                    <div onClick={nextSlide} className="cursor-pointer">
                        <Image src={imgArrowR} alt="arrow_right" width={80} height={80} />
                    </div>
                </div>
            </div>
            <div
                className="overflow-x-hidden relative w-[calc(100%*6)] md:w-[calc(33%*6)] flex justify-center gap-2 snap-x snap-mandatory p-5"
                // ref={refPassthrough}
                {...handlersBox}
            >
                {state.imgObj.map((el, i) => {
                    if (counter.current === i) {
                        gameLinkRef.current = el.link;
                        return (
                            <ImgSlide
                                ref={widthRef}
                                key={el.name}
                                spring={style}
                                imgSrc={el.image}
                                name={el.name}
                                description={el.type}
                                href={`${el.link}`}
                            />
                        );
                    } else {
                        return (
                            <ImgSlide
                                ref={widthRef}
                                key={el.name}
                                spring={styleOffsetImg}
                                imgSrc={el.image}
                                name={el.name}
                                description={el.type}
                                href={`${el.link}`}
                            />
                        );
                    }
                })}
            </div>
            <div className="flex justify-center mt-4 mb-3 py-2">
                <IconText
                    className="roundButtonClass flex flex-row-reverse bg-pageBlue shadow-glowBlue"
                    src={arrrow}
                    href={gameLinkRef.current}
                    linkTxt="View on Roblox"
                />
            </div>
        </div>
    );
}
