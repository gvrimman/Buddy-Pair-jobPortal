import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { employerProfileValidation } from "../../../../utils/yupValidations";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import TextInput from "../../../common/TextInput";
import SelectInput from "../../../common/SelectInput";
import {
  companySizeOptions,
  industyTypeOptions,
  preferredJobType,
} from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../../../utils/toast";
import axiosInstance from "../../../../utils/axios";
import { updateEmployerInfo } from "../../../../Redux/reducers/userReducer";

function ProfileForm() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset, control, watch } =
    useFormHandler(employerProfileValidation);

  // ----------------------------------------------------------------
  const [previewSrc, setPreviewSrc] = useState(null);
  // get img before submit
  const prfImg = watch("companyLogo");
  const handleImagePreview = () => {
    const file = prfImg && prfImg[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    handleImagePreview();
  }, [prfImg]);
  // ----------------------------------------------------------------
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const onSubmit = async (data) => {
    if (
      data.companyLogo &&
      data.companyLogo[0] &&
      !data.companyLogo[0].type.startsWith("image/")
    ) {
      showError("Only image files are allowed");
      return;
    }
    if (
      data.companyLogo &&
      data.companyLogo[0] &&
      data.companyLogo[0].size > 5 * 1024 * 1024
    ) {
      showError("File is too large, max size is 20MB");
      return;
    }
    try {
      const finalData = {
        companyLogo: data.companyLogo,
        name: data.companyName,
        email: data.companyEmail,
        website: data.companyWebSite,
        industry: data.industryType,
        location: data.companyLocation,
        address: data.companyAddress,
        description: data.companyDescription,
        size: data.companySize,
        workType: data.employmentType,
      };
      const response = await axiosInstance.put(
        `/auth/update-employer-profile`,
        finalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.message.includes("verification email")) {
        setNewEmail(data.companyEmail);
        setShowOtpField(true);
      }
      showSuccess(response?.data?.message);
      dispatch(
        updateEmployerInfo({
          ...userInfo,
          "apps.jobPortal.company": response?.data?.data,
        })
      );
    } catch (error) {
      showError(error?.response?.data?.message);
      if (error?.response?.data?.message.includes("OTP was sent recently")) {
        setNewEmail(data.companyEmail);
        setShowOtpField(true);
      }
    }
  };

  const handleOtpSubmit = async () => {
    if(!otp) {
      showError("Provide OTP to continue");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/auth/update-employer-profile/verifyotp`,
        {
          email: newEmail,
          otp,
        }
      );
      showSuccess(response?.data?.message);
      setShowOtpField(false);
    } catch (error) {
      showError(error?.response?.data?.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const response = await axiosInstance.post(
        `/auth/update-employer-profile/resendotp`,
        {
          email: newEmail,
        }
      );
      showSuccess(response?.data?.message);
    } catch (error) {
      showError(error?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-xl text-theme-500 tracking-wide font-semibold">
        Company Profile
      </h2>
      {!showOtpField ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" rounded-full border border-theme-500 border-spacing-2 w-20 sm:w-24 aspect-square overflow-hidden mx-auto mb-8 relative">
            <div className="absolute top-1/2 -translate-y-1/2 cursor-pointer opacity-0 scale-150">
              <TextInput
                type={"file"}
                accept="image/*"
                label={"Company Logo"}
                registering={register("companyLogo")}
                errors={errors["companyLogo"]}
              />
            </div>
            <img
              src={
                previewSrc
                  ? previewSrc
                  : userInfo?.apps?.jobPortal?.company?.logo
              }
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-5 grid lg:grid-cols-2 gap-3">
            <TextInput
              type={"text"}
              label={"Company Name"}
              errors={errors.companyName}
              registering={register("companyName")}
              value={userInfo?.apps?.jobPortal?.company?.name}
            />
            <TextInput
              type={"email"}
              label={"Email address"}
              errors={errors.companyEmail}
              registering={register("companyEmail")}
              value={userInfo?.apps?.jobPortal?.company?.email}
            />
            <TextInput
              type={"text"}
              label={"Website"}
              errors={errors.companyWebSite}
              registering={register("companyWebSite")}
              value={userInfo?.apps?.jobPortal?.company?.website}
            />
            <SelectInput
              name={"companySize"}
              label={"Company Size"}
              control={control}
              options={companySizeOptions}
              errors={errors["companySize"]}
              value={userInfo?.apps?.jobPortal?.company?.size}
            />
            <TextInput
              type={"text"}
              label={"Company Description"}
              registering={register("companyDescription")}
              errors={errors.companyDescription}
              value={userInfo?.apps?.jobPortal?.company?.description}
            />
            <TextInput
              type={"text"}
              label={"Company Address"}
              registering={register("companyAddress")}
              errors={errors.companyAddress}
              value={userInfo?.apps?.jobPortal?.company?.address}
            />
            <TextInput
              type={"text"}
              label={"Company Location"}
              registering={register("companyLocation")}
              errors={errors.companyLocation}
              value={userInfo?.apps?.jobPortal?.company?.location}
            />
            <SelectInput
              name={"employmentType"}
              label={"Employment Type"}
              control={control}
              options={preferredJobType}
              errors={errors["employmentType"]}
              value={userInfo?.apps?.jobPortal?.company?.workType}
            />
            <SelectInput
              name={"industryType"}
              label={"Industry Type"}
              control={control}
              options={industyTypeOptions}
              errors={errors["industryType"]}
              value={userInfo?.apps?.jobPortal?.company?.industry}
            />
          </div>
          <Button
            type="submit"
            className="bg-theme-500 hover:bg-theme-400 my-3 w-fit"
          >
            Update
          </Button>
        </form>
      ) : (
        <div>
          <TextInput
            type={"text"}
            label={"Enter OTP"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            onClick={handleOtpSubmit}
            className="bg-theme-500 hover:bg-theme-400 my-3 w-fit mx-1"
          >
            Verify OTP
          </Button>
          <Button
            onClick={handleResendOtp}
            className="bg-gray-500 hover:bg-gray-400 my-3 w-fit mx-1"
            disabled={resendLoading}
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
