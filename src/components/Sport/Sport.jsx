import React from "react";
import styles from "../../styles/styles";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { sport } from "../Data/data";

const Sport = () => {
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        <h1 className={`${styles.heading} mt-10 uppercase`}>Featured Sports</h1>
        <div className="">
          <Swiper
            modules={[Autoplay]}
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
                slidesPerView: 3,
                spaceBetween: 10,
              },
              // When window width is <= 640px (mobile screens)
              640: {
                slidesPerView: 4,
              },
              // When window width is <= 768px (tablet screens)
              768: {
                slidesPerView: 5,
              },
              // When window width is <= 1024px (desktop screens)
              1024: {
                slidesPerView: 6,
              },
            }}
          >
            {sport.map((item) => (
              <>
                <SwiperSlide key={item.id}>
                  <div key={item.id} className=" w-full mt-0.5">
                    <div className="flex justify-between items-center relative">
                      <img src={item.sport} className="w-full" alt="" />
                    </div>
                    <div>
                      <h4 className="text-center text-[18px] font-[700] font-Poppins italic">
                        {item.name}
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sport;
