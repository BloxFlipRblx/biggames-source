import Image from 'next/image';
import { Header } from 'components';
import { a, useSpring, config } from '@react-spring/web';
import { useSwipeable } from 'react-swipeable';
import imgArrowL from 'public/imgSliderArrowLeft.svg';
import imgArrowR from 'public/imgSliderArrowRight.svg';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const imgArr = [
    {
        name: 'Pet Simulator X! 🐾',
        image: 'https://tr.rbxcdn.com/c853010eb589c48e8f8ec38a4f3f109d/768/432/Image/Png',
        type: '4.2B+ Visits',
        link: 'https://www.roblox.com/games/6284583030/EVENT-Pet-Simulator-X',
    },
    {
        name: '🔥 BIG Paintball!',
        image: 'https://tr.rbxcdn.com/c9124fb028d0f3ba8e6ae70fd3a1bbf8/768/432/Image/Png',
        type: '1.1B+ Visits',
        link: 'https://www.roblox.com/games/3527629287/BIG-Paintball',
    },
    {
        name: '👨‍🍳✨ My Restaurant!',
        image: 'https://tr.rbxcdn.com/13c2a2de47dd03e823b6ca380c810202/768/432/Image/Png',
        type: '474.3M+ Visits',
        link: 'https://www.roblox.com/games/4490140733/My-Restaurant',
    },
    {
        name: 'Pet Simulator!',
        image: 'https://tr.rbxcdn.com/89de802286a7ec389fb50e6c7b0e70e6/768/432/Image/Png',
        type: '1.0B+ Visits',
        link: 'https://www.roblox.com/games/1599679393/Pet-Simulator',
    },
    {
        name: '😱 Giant Survival!',
        image: 'https://tr.rbxcdn.com/0d4d710d868f86ff51aad190e17651cf/768/432/Image/Png',
        type: '178.2M+ Visits',
        link: 'https://www.roblox.com/games/4003872968/Giant-Survival',
    },
    {
        name: 'Build and Survive!',
        image: 'https://tr.rbxcdn.com/31391d543aa9a76dd95f4d4f450a1139/768/432/Image/Png',
        type: '124.9M+ Visits',
        link: 'https://www.roblox.com/games/3056526277/Build-and-Survive',
    },
];
// interface ImageSliderI {}

export default function ImageSlider(): JSX.Element {
    const bodyWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const [moveX, setMoveX] = useState<number>(0);
    const [foward, setForward] = useState<number>(0);

    const widthRef = useRef<HTMLDivElement>(null!);
    const nrRef = useRef<number>(imgArr.length);
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
        transform: `translateX(-${foward}%)`,
        marginLeft: counter.current === 0 && bodyWidth! <= 640 ? '10px' : '0px',
        boxShadow: '0px 0px 35px -16px rgba(54, 70, 76, 1)',
    });
    const styleOffsetImg = useSpring({
        config: config.gentle,
        transform: `translateX(-${foward}%)`,
        opacity: 0.5,
    });

    useEffect(() => {
        if (window.innerWidth <= 640) {
            setForward(0);
            counter.current = 0;
        }
        if (window.innerWidth > 640) {
            setForward(0);
            counter.current = 0;
        }
    // setForward(0);
    }, []);

    useEffect(() => {
    //--------SMALL-------//
        if (bodyWidth! <= 640) {
            setMoveX(101.1);
        }
        if (bodyWidth! <= 640 && counter.current > 0 && counter.current === nrRef.current) {
            // console.log('small');
            setForward(0);
            counter.current = 0;
            startZero.current = true;
        }
        if (bodyWidth! <= 640 && counter.current === -1) {
            // console.log(nrRef.current * 100 - 92, 'is-1');
            setForward(nrRef.current * 100 - 92);
            counter.current = imgArr.length - 1;
            startZero.current = true;
        }
        //--------SMALL-------//
        //--------MIDDLE-------//

        if (bodyWidth! >= 640 && bodyWidth! <= 1025) {
            setMoveX(101.1);
        }
        if (bodyWidth! >= 640 && bodyWidth! <= 1025 && counter.current > 0 && counter.current === nrRef.current) {
            // console.log('small');
            setForward(0);
            counter.current = 0;
            startZero.current = true;
        }
        if (bodyWidth! >= 640 && bodyWidth! <= 1025 && counter.current === -1) {
            // console.log(nrRef.current * 100 - 92, 'is-1');
            setForward(nrRef.current * 100 - 92);
            counter.current = imgArr.length - 1;
            startZero.current = true;
        }

        //--------MIDDLE-------//
        //--------BIG-------//
        if (bodyWidth! > 1025) {
            setMoveX(101.4);
        }

        if (bodyWidth! >= 1025 && counter.current > 0 && counter.current === nrRef.current) {
            // console.log('small');
            setForward(0);
            counter.current = 0;
            startZero.current = true;
        }
        if (bodyWidth! >= 1025 && counter.current === -1) {
            // console.log(nrRef.current * 100, 'is-1');
            const l = nrRef.current - 1;
            setForward(l * 103);
            counter.current = imgArr.length - 1;
            startZero.current = true;
        }
    //--------BIG-------//
    // console.log(counter.current, nrRef.current);
    }, [bodyWidth, foward]);

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
        <div className="relative">
            <div className="absolute overflow-x-hidden top-[50%] left-[50%] transform-gpu translate-x-[-50%] translate-y-[-50%] z-[999999]">
                <div className="w-screen justify-around px-20 hidden sm:flex">
                    <div onClick={prevSlide} className="cursor-pointer">
                        <Image src={imgArrowL} alt="arrow_left" width={80} height={80} />
                    </div>
                    <div onClick={nextSlide} className="cursor-pointer">
                        <Image src={imgArrowR} alt="arrow_right" width={80} height={80} />
                    </div>
                </div>
            </div>
            <div
                className="overflow-x-hidden relative flex snap-x snap-mandatory gap-2 pb-5 px-5"
                // ref={refPassthrough}
                {...handlersBox}
            >
                <a.div
                    style={style}
                    className="p-6 w-[92%] hidden lg:block lg:w-[33%] sm:h-1/3 shrink-0 snap-center bg-white rounded-3xl mt-7 opacity-50 "
                    ref={widthRef}
                >
                    <div className="bg-pageWhite aspect-video overflow-hidden rounded-3xl">
                        <Image
                            src={imgArr[imgArr.length - 1].image}
                            width={290}
                            height={190}
                            sizes="100vw"
                            alt="post_img1"
                        />
                    </div>

                    <Header
                        className="flex flex-col items-center mt-5 mb-1"
                        title="My Restaurant!"
                        description="Simulation"
                        titleStyle="text-pageBlack font-bold text-size26"
                        descriptionStyle="bg-pageOrange tracking-wider text-white font-bold px-3 py-1 rounded-full mt-2"
                    />
                </a.div>
                {imgArr.map((el, i) => {
                    if (counter.current === i) {
                        return (
                            <a.div
                                key={el.name}
                                style={style}
                                className="p-6 w-[92%] lg:w-[33%] sm:h-1/3 shrink-0 snap-center bg-white rounded-3xl mt-7 cursor-pointer"
                            >
                                <Link href={el.link} passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <div className="bg-pageWhite aspect-video overflow-hidden rounded-3xl">
                                            <Image
                                                src={el.image}
                                                width={290}
                                                height={190}
                                                sizes="100vw"
                                                alt={el.name + i}
                                            />
                                        </div>
                                        <Header
                                            className="flex flex-col items-center mt-5 mb-1"
                                            title="My Restaurant!"
                                            description={el.type}
                                            titleStyle="text-pageBlack font-bold text-size26"
                                            descriptionStyle="bg-pageOrange tracking-wider text-white font-bold px-3 py-1 rounded-full mt-2"
                                        />
                                    </a>
                                </Link>
                            </a.div>
                        );
                    } else {
                        return (
                            <a.div
                                key={el.name}
                                style={styleOffsetImg}
                                className="p-6 w-[92%] lg:w-[33%] sm:h-1/3 shrink-0 snap-center bg-white rounded-3xl mt-7"
                            >
                                {' '}
                                <Link href={el.link} passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <div className="bg-pageWhite aspect-video overflow-hidden rounded-3xl">
                                            <Image
                                                src={el.image}
                                                width={290}
                                                height={190}
                                                sizes="100vw"
                                                alt="post_img2"
                                            />
                                        </div>
                                        <Header
                                            className="flex flex-col items-center mt-5 mb-1"
                                            title="My Restaurant!"
                                            description={el.type}
                                            titleStyle="text-pageBlack font-bold text-size26"
                                            descriptionStyle="bg-pageOrange tracking-wider text-white font-bold px-3 py-1 rounded-full mt-2"
                                        />
                                    </a>
                                </Link>
                            </a.div>
                        );
                    }
                })}
                <a.div
                    style={style}
                    className="p-6 w-[92%] hidden lg:block lg:w-[33%] sm:h-1/3 shrink-0 snap-center bg-white rounded-3xl mt-7 opacity-50"
                    ref={widthRef}
                >
                    <div className="bg-pageWhite aspect-video overflow-hidden rounded-3xl">
                        <Image src={imgArr[0].image} width={290} height={190} sizes="100vw" alt="poster_img2" />
                    </div>
                    <Header
                        className="flex flex-col items-center mt-5 mb-1"
                        title="My Restaurant!"
                        description="Simulation"
                        titleStyle="text-pageBlack font-bold text-size26"
                        descriptionStyle="bg-pageOrange tracking-wider text-white font-bold px-3 py-1 rounded-full mt-2"
                    />
                </a.div>
            </div>
        </div>
    );
}
