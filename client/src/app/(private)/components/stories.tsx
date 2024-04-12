"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export interface StoriesProps {}

export default function Stories(props: StoriesProps) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={8}
      spaceBetween={10}
      className="mySwiper"
      breakpoints={{
        0: {
          slidesPerView: 4,
        },
        640: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 6,
        },
        1024: {
          slidesPerView: 7,
        },
        1280: {
          slidesPerView: 8,
        },
        1536: {
          slidesPerView: 8,
        },
      }}
    >
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
