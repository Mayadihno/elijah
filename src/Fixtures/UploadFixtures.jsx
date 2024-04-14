import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { sportType } from "../components/Data/data";

const UploadFixtures = () => {
  const [fixtures, setFixtures] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [odd, setOdd] = useState("");
  const [sport, setSport] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      id: `${Date.now()}`,
      matchFixtures: fixtures,
      date: date,
      time: time,
      timeStamp: serverTimestamp(),
      sport: sport,
      odd,
    };
    try {
      await setDoc(doc(db, "fixtures", `${Date.now()}`), formData);
      setLoading(false); // Reset form fields after successful upload
      navigate("/fixtures", { replace: true });
      e.target.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-center items-center">
        <div className=" bg-white shadow-lg rounded-[5px] 800px:w-[70%] w-full">
          <form onSubmit={handleSubmit} className="px-3 space-y-4">
            <h2 className=" text-[16px] font-[600] font-Poppins pt-4 text-center">
              Upload Fixture
            </h2>
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Fixture name<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  autoComplete="fixtures"
                  value={fixtures}
                  onChange={(e) => setFixtures(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-[#901E78] sm:text-sm"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Fixture date<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  required
                  autoComplete="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-[#901E78] sm:text-sm"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Fixture Time<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="time"
                  required
                  autoComplete="date"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-[#901E78] sm:text-sm"
                />
              </div>
            </div>{" "}
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Fixture Odd<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="odd"
                  required
                  autoComplete="date"
                  value={odd}
                  onChange={(e) => setOdd(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-[#901E78] sm:text-sm"
                />
              </div>
            </div>
            <div className="w-full mt-1">
              <label htmlFor="" className="block">
                Preferred Sport<span className="text-red-500">*</span>
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full border h-[40px] rounded-[5px]"
              >
                <option value="" className="block pb-2">
                  Select sport to upload<span className="text-red-500">*</span>
                </option>
                {sportType &&
                  sportType.map((item) => (
                    <option
                      className="block pb-2"
                      value={item.name}
                      key={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {loading ? (
              <div className="p-2">
                <input
                  type="submit"
                  value="Uploading Fixture please wait..."
                  className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-blue-500 sm:text-sm cursor-pointer hover:bg-[#901E78] hover:text-white"
                />
              </div>
            ) : (
              <div className="p-2">
                <input
                  type="submit"
                  value="Upload"
                  className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#901E78] focus:border-blue-500 sm:text-sm cursor-pointer hover:bg-[#901E78] hover:text-white"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadFixtures;
