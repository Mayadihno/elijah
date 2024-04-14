/* eslint-disable no-constant-condition */
import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Local from "../Local/Local";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/fixtures", { replace: true });
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/wrong-password" || "auth/user-not-found") {
        toast.error("Incorrect Email or Password");
      }
    }
  };
  return (
    <React.Fragment>
      <div className={`${styles.section} my-8`}>
        <div className="flex md:items-center md:space-x-8 md:flex-row flex-col">
          <div className="md:w-1/2 w-full">
            <Local />
          </div>
          <div className="flex items-center md:w-1/2 w-full">
            <div className="bg-white shadow-lg mt-5 800px:w-full w-full">
              <div className="flex flex-col items-center pt-5">
                <img
                  src="https://www.pngall.com/wp-content/uploads/10/Olympics-Logo-PNG-Photos.png"
                  alt=""
                  className="w-[80px] h-80px] object-cover"
                />
              </div>
              <h2 className="text-[20px] font-[600] font-Poppins text-[#9C27B0] text-center p-3 mb-3">
                Login as international user
              </h2>
              <form className="space-y-6 px-5" onSubmit={handleSubmit}>
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
                      placeholder="yourEmail@gmail.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9C27B0] focus:border-[#9C27B0] sm:text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={!visible ? "password" : "text"}
                      name="password"
                      id="password"
                      required
                      placeholder="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9C27B0] focus:border-[#9C27B0] sm:text-sm"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute top-2 right-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute top-2 right-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>
                <div className={`${styles.normalFlex} justify-between`}>
                  <div className={`${styles.normalFlex}`}>
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="h-4 w-4 text-[#9C27B0] focus:ring-[#9C27B0] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className="text-sm font-medium text-[#9C27B0] hover:text-[#9C27B0]">
                    <Link to={"/forget-password"}>Forgot password</Link>
                  </div>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-[#9C27B0] hover:bg-[#9C27B0] "
                  >
                    Submit
                  </button>
                </div>
                <div
                  className={`${styles.normalFlex} flex justify-between text-[14px] w-full pb-3`}
                >
                  <div className="flex">
                    <h4>Not having account ?</h4>
                    <Link to={"/register"} className="text-[#9C27B0] pl-2">
                      Sign up
                    </Link>
                  </div>
                  <div className="flex">
                    <h4>Admin login</h4>
                    <Link to={"/admin"} className="text-[#9C27B0] pl-2">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
