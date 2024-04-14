import React, { useState } from "react";
import styles from "../../styles/styles";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Password Link has been sent to Your Email");
      navigate("/login");
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User Not Found");
      }
    }
  };

  return (
    <React.Fragment>
      <div className={`${styles.section} my-16`}>
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-lg mt-5 800px:w-1/2 w-full">
            <div className="flex flex-col items-center py-4">
              <img
                src="https://www.pngall.com/wp-content/uploads/10/Olympics-Logo-PNG-Photos.png"
                alt=""
                className="w-[80px] h-80px] object-cover"
              />
            </div>
            <h2 className="text-[20px] font-[600] font-Poppins text-[#9C27B0] text-center p-3 mb-3">
              Enter your registerd Email Here
            </h2>
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9C27B0] focus:border-[#9C27B0] sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-[#9C27B0] hover:bg-[#9C27B0]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgetPass;
