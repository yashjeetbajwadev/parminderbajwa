"use client";
import { useEffect, useState } from "react";
import { Button, LinkButton } from "@/components/ui/button";
import ParminderBajwa from "@/../public/parminderbajwa.webp";
import Image from "next/image";
import React from "react";
import { ContactMe } from "@/components/custom/ContactMe/ContactMe";

function Hero() {
  // constants
  const textColours: string[] = [
    "text-blue-500",
    "text-green-500",
    "text-orange-500",
    "text-red-500",
  ];
  const circleColours: string[] = [
    "bg-blue-200",
    "bg-green-200",
    "bg-orange-200",
    "bg-red-200",
  ];
  const animationDelay: number = 3000;
  const [slideNumber, setSlideNumber] = useState(0);
  const [animation, setAnimation] = useState("animate-fadeInDown");
  const [texts, setTexts] = useState([
    "Buy your dream home",
    "Sell your property",
    "Invest in real estate",
    "Get expert advice",
  ]);
  const [text, setText] = useState("");
  const [textColour, setTextColour] = useState("");
  const [circleColour, setCircleColour] = useState("");

  useEffect(() => {
    const updateTextsBasedOnScreenSize = () => {
      // see tailwind.config.js for breakpoints
      if (window.innerWidth < 640) {
        setTexts(["Buy", "Sell", "Invest", "Discover"]);
      } else {
        setTexts([
          "Buy your dream home",
          "Sell your property",
          "Invest in real estate",
          "Get expert advice",
        ]);
      }
    };

    updateTextsBasedOnScreenSize();
    window.addEventListener("resize", updateTextsBasedOnScreenSize);

    return () =>
      window.removeEventListener("resize", updateTextsBasedOnScreenSize);
  }, []);

  function update() {
    const carouselIndex: number = slideNumber % textColours.length;
    const textColour: string = textColours[carouselIndex];
    const circleColour: string = circleColours[carouselIndex];
    setText(texts[carouselIndex]);
    setTextColour(textColour);
    setCircleColour(circleColour);
  }

  const nextSlide = () => {
    setAnimation("opacity-0");
    if (slideNumber === textColours.length - 1) {
      setSlideNumber(0);
    }
    setTimeout(() => {
      setSlideNumber(slideNumber + 1);
      update();
      setAnimation("animate-fadeInDown");
    }, 100);
  };

  useEffect(() => {
    update();
    const interval = setInterval(() => {
      nextSlide();
    }, animationDelay);
    return () => clearInterval(interval);
  });
  return (
    <div className="grid overflow-x-hidden">
      <div className="my-[60px] md:my-[100px]">
        <div className="p-0 relative mx-[20px] mb-[32px] flex flex-col lg:mx-[32px] lg:mb-[0px] lg:flex-row lg:flex-wrap lg:justify-center lg:pt-[60px]">
          <div
            className={`relative z-40 grid items-center justify-items-center text-center lg:w-[850.58px] lg:justify-items-end`}
          >
            <h2
              className={`relative col-start-1 col-end-auto row-start-1 row-end-auto mb-2 text-[clamp(32px,15vw,62px)] leading-none lg:text-[80px] ${textColour} ${animation} font-bold sm:h-14 md:h-auto sm:bottom-12 md:bottom-auto sm:w-[90%] md:w-auto `}
            >
              <span className="font-bold">{text}</span>
            </h2>
          </div>
          <div className="z-40 xsm:mb-5 xsm:mt-1 lg:order-1 lg:mb-20 lg:basis-full lg:text-center">
            <div className="inline-block w-full lg:relative lg:inline">
              <p className="text-base font-normal leading-normal text-center text-gray-900 break-normal dark:text-white lg:inline">
                <span className="text-[clamp(32px,12vw,62px)] font-bold leading-none lg:text-[80px]">
                  with Parminder Bajwa
                </span>
              </p>
            </div>
          </div>
          <div className="flex h-[240px] items-end lg:z-0 lg:mr-[-30px] lg:w-[330px] lg:items-center lg:justify-end">
            <div
              className={`clipCircle relative z-30 mx-auto my-0 grid h-[min(90vw,320px)] w-[min(90vw,320px)] shrink-0 items-center justify-items-center transition-colors duration-300 ease-linear lg:h-[360px] lg:w-[360px] ${circleColour} dark:bg-boxdark`}
            >
              <div className="relative col-start-1 col-end-auto row-start-1 row-end-auto">
                <Image
                  className={`relative w-[min(90vw,228px)] rounded-2xl shadow-xl xsm:w-[min(90vw,256px)]`}
                  src={ParminderBajwa}
                  alt="Parminder Bajwa"
                  width={228}
                  height={228}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-[28px] sm:mx-[40px] lg:mx-[72px]">
          <div className="relative z-30 mb-[36px] text-center text-gray-800">
            <p className="text-[18px] font-normal leading-normal dark:text-white">
              Find your dream home effortlessly with Parminder Bajwa and our
              expert real estate services.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ContactMe
              openInModal
              className="max-w-[500px] bg-blue-500 text-white flex-grow rounded-xl p-6 text-[16px] hover:bg-blue-600 md:flex-grow-0"
            />
            <LinkButton
              href="/listings"
              buttonevent="hero view properties"
              className="max-w-[500px] flex-grow rounded-xl p-6 text-[16px] text-blue-500 transition-colors duration-300 border-blue-500 hover:bg-blue-600 hover:text-white md:flex-grow-0"
              type="button"
              variant="outline"
            >
              View properties
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
