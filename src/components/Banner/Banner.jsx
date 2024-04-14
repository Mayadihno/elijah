import React from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { data } from "../Data/data";
const Banner = () => {
  return (
    <React.Fragment>
      <div className="">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          // slidesPerView={3}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // mobile landscape
            478: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // When window width is <= 640px (mobile screens)
            640: {
              slidesPerView: 1,
            },
            // When window width is <= 768px (tablet screens)
            768: {
              slidesPerView: 2,
            },
            // When window width is <= 1024px (desktop screens)
            1024: {
              slidesPerView: 1,
            },
          }}
          effect={"coverflow"}
        >
          {data.map((item) => (
            <>
              <SwiperSlide key={item.id}>
                <div className=" w-full md:h-[80vh] h-full md:mt-0.5 mt-16">
                  <div className="flex justify-between items-center relative">
                    <img src={item.image} className="w-full" alt="" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[#000000] opacity-30"></div>
                  </div>
                  <div className="text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h4 className="text-white text-sm md:text-[30px] md:font-[700] md:leading-9 font-Poppins italic">
                      {item.text}
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default Banner;
