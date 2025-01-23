import React, { useState, useEffect } from "react";
import TextInput from "../../components/common/TextInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { otpVerifyValidation } from "../../utils/yupValidations";
import { setUser } from "../../Redux/reducers/userReducer";
import { Button } from "@material-tailwind/react";
import { showError, showSuccess } from "../../utils/toast";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import { RiLoader4Line } from "react-icons/ri";

function VerifyOTP({
  mail,
  openUserInfoModal,
  goBack,
  quickResendOTP,
  setquickResendOTP,
  logout,
}) {
  const { register, handleSubmit, errors, reset } =
    useFormHandler(otpVerifyValidation);
  const [resendDisabled, setResendDisabled] = useState(!quickResendOTP);
  const [countdown, setCountdown] = useState(120); // 2-minute countdown
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const dispatch = useDispatch();

  // Countdown logic
  useEffect(() => {
    if (!quickResendOTP && resendDisabled) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quickResendOTP, resendDisabled]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formatData = {
      email: mail,
      otp: data.otp,
    };
    try {
      const response = await axiosInstance.post(
        "/auth/signup/verifyotp",
        formatData
      );
      setIsLoading(false);
      dispatch(setUser(response?.data?.data));
      showSuccess(response?.data?.message);
      reset();
      openUserInfoModal();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showError(error?.response?.data?.message);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading2(true);
      await axiosInstance.post("/auth/signup/resendotp", {
        email: mail,
      });
      showSuccess("OTP resent successfully.");
      setResendDisabled(true);
      setCountdown(120); // Reset the countdown for 2 minutes
      setquickResendOTP(false);
      setIsLoading2(false);
    } catch (error) {
      setIsLoading2(false);
      console.log(error);
      showError("Failed to resend OTP.");
    }
  };

  return (
    <div className="flex flex-col gap-4 px-1 py-5">
      <div className="relative text-center">
        <h1 className="text-theme-500 text-lg md:text-2xl font-bold">
          Verify Email
        </h1>
        <p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
          Enter valid OTP to continue
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label="Otp"
          errors={errors.otp}
          registering={register("otp")}
        />

        <div className="text-end mt-3">
          <Button
            onClick={logout}
            className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1"
          >
            Logout
          </Button>
          <Button
            onClick={goBack}
            className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1"
          >
            Close
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400"
          >
            {isLoading ? (
              <span>
                <RiLoader4Line className="animate-spin text-xl" />
              </span>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Button
          onClick={handleResendOTP}
          disabled={resendDisabled || isLoading2}
          className="rounded py-2 px-3 sm:py-3 sm:px-4"
        >
          {isLoading2 ? (
            <span>
              <RiLoader4Line className="animate-spin text-xl" />
            </span>
          ) : resendDisabled ? (
            `Resend OTP in ${countdown}s`
          ) : (
            "Resend OTP"
          )}
        </Button>
      </div>
    </div>
  );
}

export default VerifyOTP;
