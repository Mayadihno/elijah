import React, { useState } from "react";
import styles from "../styles/styles";
import {
  BiImage,
  BiSolidGame,
  BiSolidUserAccount,
  BiSolidVideo,
} from "react-icons/bi";
import Button from "@mui/material/Button";
import Users from "../Users/User";
import UploadFixtures from "../Fixtures/UploadFixtures";
import UploadGallery from "../Gallery/UploadGallery";
import UploadVideo from "../Video/UploadVideo";

const Dashboard = () => {
  const [user, setUser] = useState(true);
  const [users, setUsers] = useState("");
  const [fixture, setFixture] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [video, setVideo] = useState(false);
  const handleUsers = () => {
    setUser(!user);
    setFixture(false);
    setGallery(false);
    setVideo(false);
  };
  const handleFixture = () => {
    setFixture(!fixture);
    setUser(false);
    setGallery(false);
    setVideo(false);
  };
  const handleGallery = () => {
    setGallery(!gallery);
    setFixture(false);
    setUser(false);
    setVideo(false);
  };
  const handleVideo = () => {
    setVideo(!video);
    setGallery(false);
    setFixture(false);
    setUser(false);
  };
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
        <h3 className=" font-Poppins text-[22px] pb-2 md:pt-0 pt-10">
          Dashboard Overview
        </h3>
        <div className="block 800px:w-full w-[100%] 800px:space-x-8 800px:flex items-center justify-between">
          <div className=" list w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
            <div className="flex justify-between pb-4">
              <div className="flex items-center">
                <BiSolidUserAccount
                  size={30}
                  className="mr-2"
                  color="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}
                >
                  Users
                </h3>
              </div>
              <h5 className="text-[22px] font-[500]">{users}</h5>
            </div>

            <div className="pt-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleUsers}
              >
                View users
              </Button>
            </div>
          </div>
          <div className=" list w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
            <div className="flex justify-between pb-4">
              <div className="flex items-center">
                <BiSolidGame size={30} className="mr-2" color="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}
                >
                  Fixtures
                </h3>
              </div>
              <h5 className="text-[22px] font-[500]">10</h5>
            </div>

            <div className="pt-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleFixture}
              >
                Upload Fixtures
              </Button>
            </div>
          </div>
          <div className=" list w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
            <div className="flex justify-between pb-4">
              <div className="flex items-center">
                <BiSolidVideo size={30} className="mr-2" color="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}
                >
                  Highlights
                </h3>
              </div>
              <h5 className="text-[22px] font-[500]">22</h5>
            </div>

            <div className="pt-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleVideo}
              >
                Upload Video
              </Button>
            </div>
          </div>
          <div className=" list w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow px-2 rounded py-5">
            <div className="flex justify-between pb-4">
              <div className="flex items-center">
                <BiImage size={30} className="mr-2" color="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[500] text-[#00000085]`}
                >
                  Images
                </h3>
              </div>
              <h5 className="text-[22px] font-[500]">32</h5>
            </div>

            <div className="pt-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleGallery}
              >
                Upload Image
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-3">
          {user && <Users setUsers={setUsers} />}
          {fixture && <UploadFixtures />}
          {gallery && <UploadGallery />}
          {video && <UploadVideo />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
