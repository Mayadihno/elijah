import React from "react";
import styles from "../../styles/styles";
import { news } from "../Data/data";

const News = () => {
  const data = news.slice(3, 9);
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        <h1 className={`${styles.heading} my-5 uppercase`}>Trending News</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-3">
          {data.map((item) => {
            return (
              <div
                className="bg-[#fff] shadow-lg rounded-[8px] cursor-pointer"
                key={item.id}
              >
                <div className="">
                  <img
                    src={item.Image}
                    alt=""
                    className="w-full object-contain h-full"
                  />
                </div>
                <div className=" py-2 px-2">
                  <h4 className="text-[14px] underline cursor-pointer">
                    {item.title}
                  </h4>

                  <p className="text-[13px] pt-4">
                    {item.text.slice(0, 180)}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default News;
