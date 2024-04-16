import React from "react";
import styles from "../../styles/styles";
import { sport } from "../Data/data";

const Sports = () => {
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        <h3 className={`${styles.heading}`}>Available Sports</h3>

        <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
          {sport.map((item) => (
            <div key={item.id} className=" w-full mt-0.5 cursor-pointer">
              <div className="flex justify-between items-center relative">
                <img src={item.sport} className="w-full" alt="" />
              </div>
              <div>
                <h4 className="text-center text-[18px] font-[700] font-Poppins italic">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sports;
