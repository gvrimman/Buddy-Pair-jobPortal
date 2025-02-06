import React, { useEffect, useState } from "react";
import avatar from "/assets/images/office.png";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {
	companySizeOptions,
	industyTypeOptions,
	preferredJobType,
} from "../../utils/constants";
import { setUser } from "../../Redux/reducers/userReducer";
import TextInput from "../../components/common/TextInput";
import SelectInput from "../../components/common/SelectInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import {
  emplyerInfoValidation,
  companyValidationSchema,
} from "../../utils/yupValidations";
import { showError, showSuccess } from "../../utils/toast";
import axiosInstance from "../../utils/axios";
import { RiLoader4Line } from "react-icons/ri";

function EmployerInfo({ userData, onClose, goBack }) {
	const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const [previewSrc, setPreviewSrc] = useState(null);

	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
    useFormHandler(companyValidationSchema);

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

	// Fetch company list
	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const res = await axiosInstance.get("/company");
				setCompanies(res.data.data);
			} catch (error) {
				console.error("Error fetching companies:", error);
			}
		};
		fetchCompanies();
	}, []);

	const handleSelectChange = (e) => {
		const value = e.target.value;
		setSelectedCompany(value);
		if (value === "register_new") {
		setShowRegisterForm(true);
		} else {
		setShowRegisterForm(false);
		}
	};

	const onCompanySubmit = async (data) => {
		try {
			setIsLoading(true);
			const finalData = { 
				...userData, 
				...(selectedCompany && selectedCompany !== "register_new" && { company: selectedCompany }) 
			};

			const response = await axiosInstance.post(
				"/auth/employer-signup/v2",
				finalData
			);
			showSuccess(response?.data?.message);

			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value);
			});
			formData.append("companyLogo", data.companyLogo[0]);

			const res = await axiosInstance.post("/company/register", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			showSuccess(res.data.message);
			setShowRegisterForm(false);
			dispatch(setUser(response?.data?.data));
      		onClose();
			reset();
			setIsLoading(false);
		} catch (error) {
			showError(error.response?.data?.message || "Company registration failed");
			setIsLoading(false);
		}
  };

	useEffect(() => {
		handleImagePreview();
	}, [prfImg]);

	const onSubmit = async (e) => {
		if (!selectedCompany) {
			showError("Select a Company to continue");
			return;
		}
		if(selectedCompany === "register_new") {
			setShowRegisterForm(true);
			return;
		}
		try {
			const finalData = { ...userData, company: selectedCompany };
			setIsLoading(true);
			const response = await axiosInstance.post(
				"/auth/employer-signup/v2",
				finalData
			);
			dispatch(setUser(response?.data?.data));
			setIsLoading(false);
			onClose();
			showSuccess(response?.data?.message);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			showError(error.response?.data?.message);
		}
	};

	return (
    <div className=" flex flex-col gap-4 px-1">
      {!showRegisterForm && (
        <form onSubmit={onSubmit}>
          <Typography
            variant="h4"
            color="blue-gray"
            className="text-center pb-4"
          >
            Choose Company
          </Typography>
          <select
            value={selectedCompany}
            onChange={handleSelectChange}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select Company --</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
            <option value="register_new">Register New Company</option>
          </select>
          <div className="mt-2 text-end">
            <Button
              onClick={goBack}
              className=" py-2 px-3 sm:py-3 sm:px-4 mx-1"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400"
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
      )}
      {showRegisterForm && (
        <form onSubmit={handleSubmit(onCompanySubmit)}>
          <Typography
            variant="h4"
            color="blue-gray"
            className="text-center pb-4"
          >
            Register Company
          </Typography>
          <div className=" rounded-full w-20 sm:w-24 aspect-square overflow-hidden mx-auto relative mb-4">
            <div className="absolute top-1/2 -translate-y-1/2 cursor-pointer opacity-0 scale-150">
              <TextInput
                type={"file"}
                label={"companyLogo"}
                registering={register("companyLogo")}
                errors={errors["companyLogo"]}
              />
            </div>
            <img
              src={previewSrc ? previewSrc : avatar}
              alt=""
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="relative grid md:grid-cols-2 gap-3 md:gap-8 mb-3">
            <TextInput
              type={"text"}
              label={"Company Name"}
              registering={register("name")}
              errors={errors.name}
            />
            <TextInput
              type={"text"}
              label={"Company Website"}
              registering={register("website")}
              errors={errors.website}
            />
            <TextInput
              type={"email"}
              label={"Company Email"}
              registering={register("email")}
              errors={errors.email}
            />
            <TextInput
              type={"text"}
              label={"Company Location"}
              registering={register("location")}
              errors={errors.location}
            />
            <TextInput
              type={"text"}
              label={"Company Address"}
              registering={register("address")}
              errors={errors.address}
            />
            <TextInput
              type={"text"}
              label={"Company Description"}
              registering={register("description")}
              errors={errors.description}
            />
            <SelectInput
              name={"size"}
              label={"Company Size"}
              control={control}
              registering={register("size")}
              options={companySizeOptions}
              errors={errors["size"]}
            />
            <SelectInput
              name={"industry"}
              label={"Industry Type"}
              control={control}
              registering={register("industry")}
              options={industyTypeOptions}
              errors={errors["industry"]}
            />
            <SelectInput
              name={"EmploymentType"}
              label={"Employment Type"}
              control={control}
              registering={register("workType")}
              options={preferredJobType}
              errors={errors["workType"]}
            />
            <TextInput
              type={"text"}
              label={"LinkedIn"}
              registering={register("linkedin")}
              errors={errors.linkedin}
            />
          </div>
          <div className="text-end">
            <Button
              onClick={() => setShowRegisterForm(false)}
              className=" py-2 px-3 sm:py-3 sm:px-4 mx-1"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400"
            >
              {isLoading ? (
                <span>
                  <RiLoader4Line className="animate-spin text-xl" />
                </span>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EmployerInfo;
