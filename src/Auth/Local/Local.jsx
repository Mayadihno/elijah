import React, { useState } from "react";
import { Button, Card, CardContent, Stack } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { BiPhone } from "react-icons/bi";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const Local = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();

            console.log(response);
          },
          "expired-callback": () => {},
        }
      );
    }
    // Set appVerificationDisabledForTesting property
    auth.appVerificationDisabledForTesting = true;
    // auth.appVerificationDisabledForTesting = false;
  };
  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phoneNumber;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Send Successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.code === "auth/invalid-phone-number") {
          toast.error("Invalid Phone Number");
        }
        if (error.code === "auth/too-many-requests") {
          toast.error(
            "Too many authentication attempts. Please try again later."
          );
          console.error(
            "Too many authentication attempts. Please try again later."
          );
        }
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);

        await setDoc(doc(db, "users", res.user.uid), {
          phoneNumber: res.user.phoneNumber,
          fullName: fullName,
        });
      })
      .catch((err) => {
        console.log(err.code);
        setLoading(false);
      });
  }
  if (user) {
    navigate("/fixtures", { replace: true });
    toast.success("You Have Login Successfully");
  }
  return (
    <React.Fragment>
      <div className="bg-white shadow-lg 800px:w-full w-full my-8 pb-20 pt-10">
        <div className="flex flex-col items-center">
          <img
            src="https://www.pngall.com/wp-content/uploads/10/Olympics-Logo-PNG-Photos.png"
            alt=""
            className="w-[80px] h-80px] object-cover"
          />
        </div>
        <h2 className="text-[20px] font-[600] font-Poppins text-[#9C27B0] text-center p-3">
          Login as Local user
        </h2>
        <div className="flex justify-center items-center text-white mb-4">
          <i className=" bg-[#9C27B0] p-4 rounded-full">
            <BiPhone size={25} />
          </i>
        </div>
        <div className="flex justify-center items-center">
          <div className="phone">
            <div id="recaptcha-container" className="recaptcha-container"></div>
            {!user && (
              <div className="phone__content">
                {!showOTP ? (
                  <div className="">
                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#9C27B0]"
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
                    <h1 className="text-sm text-[#9C27B0] font-medium pb-2 pt-3">
                      Enter Your Phone Number Here
                      <span className="text-red-500">*</span>
                    </h1>
                    <div className="phone__input">
                      <PhoneInput
                        country="gb"
                        enableAreaCodes={true}
                        onlyCountries={["gb", "ng"]}
                        preserveOrder={["onlyCountries", "preferredCountries"]}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
                    </div>
                    <div className="button">
                      <Stack
                        align="center"
                        padding={"20px 0px"}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        {loading ? (
                          <Button
                            color="secondary"
                            variant="contained"
                            startIcon={
                              <span className="text-[10px]">
                                Sending Code...
                              </span>
                            }
                          />
                        ) : (
                          <Button
                            onClick={onSignup}
                            color="secondary"
                            variant="contained"
                          >
                            <span>Get Code</span>
                          </Button>
                        )}
                      </Stack>
                    </div>
                  </div>
                ) : (
                  <div className="phone__otp">
                    <Card className="text-center">
                      <CardContent>
                        <h1 className="text-[16px] font-[600] font-Poppins pb-3">
                          Welcome back user
                        </h1>
                        <div className="icons"></div>
                        <div className=" text-gray-700 text-[14px] pb-2">
                          Input Receive OTP Here
                        </div>
                        <div className="otp">
                          <OtpInput
                            OTPLength={6}
                            otpType="number"
                            value={otp}
                            onChange={setOtp}
                            disabled={false}
                            autoFocus
                            className="otp-container"
                          ></OtpInput>
                        </div>
                        <div className="button">
                          <Stack
                            align="center"
                            padding={"20px 0px"}
                            display={"flex"}
                            justifyContent={"center"}
                          >
                            {loading ? (
                              <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<span>Verifying OTP</span>}
                              />
                            ) : (
                              <Button
                                onClick={onOTPVerify}
                                color="secondary"
                                variant="contained"
                              >
                                <span>Verify OTP</span>
                              </Button>
                            )}
                          </Stack>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Local;
