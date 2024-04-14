import React, { useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Country } from "country-state-city";
import { language, sportType } from "../../components/Data/data";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [sports, setSports] = useState("");
  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userRole = "user";
    if (email === "mayadihno@gmail.com") {
      userRole = "admin";
    }
    try {
      if (password !== Cpassword) {
        toast.warning("password and confrim password did not match");
        return;
      }

      const formData = {
        email,
        password,
        fullName,
        country,
        lang,
        sports,
        phone,
        role: userRole,
      };
      const users = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: fullName,
        PhoneNumber: phone,
        Email: email,
      });

      const usersData = users.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = Date.now();
      await setDoc(doc(db, "users", usersData.uid), {
        formDataCopy,
        uid: usersData.uid,
      });
      toast.success("You have successfull create account");
      navigate("/fixtures", { replace: true });
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email have already been used");
        console.log(error);
      } else if (error.code === "auth/weak-password") {
        toast.warning("Password should be more than 6 letters");
      } else {
        toast.error("Something went wrong");
        // console.log(error.message);
      }
    }
  };
  return (
    <React.Fragment>
      <div className={`${styles.section} my-10`}>
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
              Register as international user
            </h2>
            <form className="space-y-6 px-5" onSubmit={handleSubmit}>
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    autoComplete="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9C27B0] focus:border-[#9C27B0] sm:text-sm"
                  />
                </div>
              </div>
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
              <div className="">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    autoComplete="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#9C27B0] focus:border[#9C27B0] sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-full mt-1">
                <label htmlFor="" className="block pb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border h-[40px] rounded-[5px]"
                >
                  <option value="" className="block ">
                    Choose your country
                  </option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option
                        className="block pb-2"
                        value={item.isoCode}
                        key={item.isoCode}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full mt-1">
                <label htmlFor="" className="block pb-2">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full border h-[40px] rounded-[5px]"
                >
                  <option value="" className="block ">
                    Choose your language
                  </option>
                  {language &&
                    language.map((item) => (
                      <option
                        className="block pb-2"
                        value={item.lang}
                        key={item.lang}
                      >
                        {item.lang}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full mt-1">
                <label htmlFor="" className="block">
                  Preferred Sport <span className="text-red-500">*</span>
                </label>
                <select
                  value={sports}
                  onChange={(e) => setSports(e.target.value)}
                  className="w-full border h-[40px] rounded-[5px]"
                >
                  <option value="" className="block pb-2">
                    Choose your prefered sport
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
              <div className="">
                <label
                  htmlFor="Cpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type={!visible ? "password" : "text"}
                    name="Cpassword"
                    id="Cpassword"
                    required
                    value={Cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
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
              <div className="">
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-[#9C27B0] hover:bg-[#9C27B0] "
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.normalFlex} w-full pb-3`}>
                <h4>Already have an account ?</h4>
                <Link to={"/login"} className="text-[#9C27B0] pl-2">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
