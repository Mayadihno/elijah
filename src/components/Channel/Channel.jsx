import React from "react";
import styles from "../../styles/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Channel = () => {
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        <h1 className={`${styles.heading}`}>TV Channel</h1>
        <div className="flex md:justify-between md:space-x-6 md:flex-row flex-col">
          <div className="">
            <Typography
              variant="h5"
              sx={{ lineHeight: "40px", fontSize: "16px" }}
            >
              Experience the pinnacle of sports with non-stop access, 24/7,
              through Olympic Channel TV. Get up close to the greatest movements
              in the world of sports from every possible angle. Our coverage
              includes in-depth, all-encompassing content, original programming,
              exclusive footage, and interviews that bring you closer than ever
              to the heart of the action. Feel the thrill through continuous and
              comprehensive coverage that captures the essence of sports like
              never before.
            </Typography>
            <div className="mt-3">
              <Button variant="contained" color="secondary">
                Watch Here
              </Button>
            </div>
          </div>

          <div className="md:w-[2500px] sm:w-[300px] md:ml-0 ml-3 md:pt-0 pt-4">
            <img
              src="https://img.olympicchannel.com/images/image/private/t_16-9_960/f_auto/v1538355600/primary/epw3fno2mzhyhn65l7lt"
              alt=""
              className=" rounded-[4px]"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Channel;
