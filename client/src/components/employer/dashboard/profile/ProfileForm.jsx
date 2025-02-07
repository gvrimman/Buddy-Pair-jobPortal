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
import { showError, showSuccess, showWarn } from "../../../../utils/toast";
import axiosInstance from "../../../../utils/axios";
import { updateEmployerInfo } from "../../../../Redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
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

  useEffect(() => {
    if(!isLoading && userInfo?.apps?.jobPortal?.role !== "employer") {
      navigate("/job-portal/profile");
    }
    const editor = userInfo?._id;
    const companyAuthor = userInfo?.apps?.jobPortal?.company?.createdBy;
    const unVerifiedEmail = userInfo?.apps?.jobPortal?.company?.unVerifiedEmail;
    const verifiedEmail = userInfo?.apps?.jobPortal?.company?.email;
    setIsEditable(editor === companyAuthor && companyAuthor);
    if (
      editor === companyAuthor &&
      companyAuthor &&
      unVerifiedEmail &&
      !verifiedEmail
    ) {
      setNewEmail(unVerifiedEmail);
      setShowOtpField(true);
      showWarn("Company mail verification is pending.", {
        toastId: "mail-verify",
      });
    }
    companyAuthor ? setIsRegistering(false) : setIsRegistering(true);
  }, [userInfo]);

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
        `company/update-company`,
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
          apps: {
            ...userInfo.apps,
            jobPortal: {
              ...userInfo.apps.jobPortal,
              company: response?.data?.data,
            },
          },
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
    if (!otp) {
      showError("Provide OTP to continue");
      return;
    }
    try {
      const response = await axiosInstance.post(`company/verify-email-otp`, {
        email: newEmail,
        otp,
      });
      showSuccess(response?.data?.message);
      dispatch(
        updateEmployerInfo({
          ...userInfo,
          apps: {
            ...userInfo.apps,
            jobPortal: {
              ...userInfo.apps.jobPortal,
              company: response?.data?.data,
            },
          },
        })
      );
      setShowOtpField(false);
    } catch (error) {
      showError(error?.response?.data?.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const response = await axiosInstance.post(`company/resend-email-otp`, {
        email: newEmail,
      });
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
                disabled={!isEditable}
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
          {!isEditable && (
            <div className="w-full text-center text-gray-800">
              You are previewing the company profile.
            </div>
          )}
          <div className="mt-5 grid lg:grid-cols-2 gap-3">
            <TextInput
              type={"text"}
              label={"Company Name"}
              errors={errors.companyName}
              registering={register("companyName")}
              value={userInfo?.apps?.jobPortal?.company?.name}
              disabled={!isEditable}
            />
            <TextInput
              type={"email"}
              label={"Email address"}
              errors={errors.companyEmail}
              registering={register("companyEmail")}
              value={userInfo?.apps?.jobPortal?.company?.email}
              disabled={!isEditable}
            />
            <TextInput
              type={"text"}
              label={"Website"}
              errors={errors.companyWebSite}
              registering={register("companyWebSite")}
              value={userInfo?.apps?.jobPortal?.company?.website}
              disabled={!isEditable}
            />
            <SelectInput
              name={"companySize"}
              label={"Company Size"}
              control={control}
              options={companySizeOptions}
              errors={errors["companySize"]}
              value={userInfo?.apps?.jobPortal?.company?.size}
              disabled={!isEditable}
            />
            <TextInput
              type={"text"}
              label={"Company Description"}
              registering={register("companyDescription")}
              errors={errors.companyDescription}
              value={userInfo?.apps?.jobPortal?.company?.description}
              disabled={!isEditable}
            />
            <TextInput
              type={"text"}
              label={"Company Address"}
              registering={register("companyAddress")}
              errors={errors.companyAddress}
              value={userInfo?.apps?.jobPortal?.company?.address}
              disabled={!isEditable}
            />
            <TextInput
              type={"text"}
              label={"Company Location"}
              registering={register("companyLocation")}
              errors={errors.companyLocation}
              value={userInfo?.apps?.jobPortal?.company?.location}
              disabled={!isEditable}
            />
            <SelectInput
              name={"employmentType"}
              label={"Employment Type"}
              control={control}
              options={preferredJobType}
              errors={errors["employmentType"]}
              value={userInfo?.apps?.jobPortal?.company?.workType}
              disabled={!isEditable}
            />
            <SelectInput
              name={"industryType"}
              label={"Industry Type"}
              control={control}
              options={industyTypeOptions}
              errors={errors["industryType"]}
              value={userInfo?.apps?.jobPortal?.company?.industry}
              disabled={!isEditable}
            />
          </div>
          <Button
            type="submit"
            disabled={!isEditable}
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
            disabled={!isEditable}
          />
          <Button
            onClick={handleOtpSubmit}
            disabled={!isEditable}
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
