"use client";

import { home_phone, screenshot1, screenshot2, screenshot3, screenshot4 } from "@/assets/images";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export interface ScreenshotSliderProps {}

export default function ScreenshotSlider(props: ScreenshotSliderProps) {
  return (
    <div className="relative w-[375px] h-[578px] hidden lg:block">
      <Image src={home_phone} alt="home_phone" className="object-cover" />
      <Swiper
        modules={[EffectFade, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="fade"
        className="!absolute top-6 right-[17px] w-[250px]"
      >
        <SwiperSlide>
          <Image src={screenshot1} alt="screenshot" className="object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={screenshot2} alt="screenshot" className="object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={screenshot3} alt="screenshot" className="object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={screenshot4} alt="screenshot" className="object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
