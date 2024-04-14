import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { db } from "../firebase/config";

const UploadVideo = () => {
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage();
  const handleFileChange = (e) => {
    const files = e.target.files[0];
    setAvatar(files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(storage, `Videos/${avatar.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // get the Progress Function
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //Update Progress
          console.log(`progres is ${progress}`);
          setLoading(true);
        },
        (error) => {
          //Error Function
          console.log(error);
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            // setVideosUrl(url);
            const addRef = collection(db, "videos");
            await addDoc(addRef, {
              videoUrl: url,
              desc: description,
              timestamp: Date.now(),
            });
            toast.success("Video Upload Successfully");
            navigate("/video", { replace: true });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div className=" bg-white shadow-lg rounded-[5px] mx-auto 800px:w-1/2 w-full">
        <form onSubmit={handleSubmit}>
          <h2 className=" text-[16px] font-[600] font-Poppins pt-4 text-center">
            Upload event video
          </h2>
          <div>
            <div className="mt-2 flex items-center justify-center py-5">
              <span
                className={`inline-block ${
                  avatar ? "h-1/3 w-1/3" : "h-8 w-8 "
                } rounded-[4px] overflow-hidden`}
              >
                {avatar ? (
                  <video
                    controls
                    width="300"
                    height="200"
                    className="rounded-[4px]"
                  >
                    <source
                      src={URL.createObjectURL(avatar)}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <MdOutlineSlowMotionVideo className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex cursor-pointer items-center justify-center px-10 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>select video</span>
                <input
                  type="file"
                  name="file"
                  id="file-input"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="p-2">
            <label
              htmlFor="description"
              className="pb-2 text-[14px] font-[600]"
            >
              Say something about the video
              <span className=" text-red-500">*</span>
            </label>
            <textarea
              cols={30}
              rows={8}
              type="text"
              name="description"
              value={description}
              id="description"
              required
              onChange={(e) => setDescription(e.target.value)}
              className=" mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-[#901E78] sm:text-sm"
              placeholder="Enter video description..."
            />
          </div>
          <div className="p-2">
            {loading ? (
              <input
                type="submit"
                value="Uploading video please wait don't refresh page..."
                className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-[#901E78] sm:text-sm cursor-pointer hover:bg-[#901E78] hover:text-white"
              />
            ) : (
              <input
                type="submit"
                value="Upload"
                className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border[#901E78] sm:text-sm cursor-pointer hover:bg-[#901E78] hover:text-white"
              />
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UploadVideo;
