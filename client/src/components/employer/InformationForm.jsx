import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { IoPersonOutline } from "react-icons/io5";

// import { setEmployerBasicInfo } from "../../../redux/employerSlice";
// import { uploadImgFile } from "../../../utils/uploadFuncs";
import InputField from "../common/InputField";
import MultiLists from "../common/MultiLists";

function InformationForm() {
	const [infoValues, setInfoValues] = useState({
		companyLogo: "",
		companyName: "",
		companyMail: "",
		companyContact: "",
		industryType: null,
	});
	const [imgError, setImgError] = useState("");
	const fileRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const maxSize = 5 * 1024 * 1024;

	const handleUploadImg = (e) => {
		const file = e.target.files[0];

		// uploadImgFile(file, maxSize)
		//   .then((data) => {
		//     setInfoValues({ ...infoValues, companyLogo: data });
		//   })
		//   .catch((error) => {
		//     setImgError(error);
		//   });
	};

	const handleInputValues = (name, value) => {
		setInfoValues({ ...infoValues, [name]: value });
	};

	const handleMultiLists = (values) => {
		setInfoValues({ ...infoValues, industryType: values });
	};

	const handleSubmitBtn = (e) => {
		e.preventDefault();
		const {
			companyLogo,
			companyName,
			companyMail,
			companyContact,
			industryType,
		} = infoValues;

		if (
			!companyLogo ||
			!companyName ||
			!companyMail ||
			!companyContact ||
			!industryType
		) {
			toast.info("Input Values Are Not Fullfilled");
			return;
		}

		// dispatch(setEmployerBasicInfo(infoValues));
		navigate("/job-portal/employer");
	};

	return (
		<div className="w-full h-full flex justify-center items-center ">
			<div className="w-fit md:w-5/12 lg:w-4/12 xl:w-3/12 h-[85%] bg-white grid  m-2 p-4 rounded-md shadow-lg overflow-y-auto custom-scrollbar">
				<div className="flex justify-between items-center gap-3 ">
					<div>
						{infoValues?.companyLogo ? (
							<img
								src={infoValues.companyLogo}
								className="w-24 h-24  object-cover rounded-full"
								alt="user-image"
							/>
						) : (
							<div className="border-2 border-[#673ab7] text-[#673ab7] rounded-full p-4 text-5xl">
								<IoPersonOutline />
							</div>
						)}
					</div>
					<button
						onClick={() => fileRef.current.click()}
						className="text-sm lg:text-md bg-[#673ab7] text-white font-semibold px-3 py-2 outline outline-1 rounded-lg">
						Upload Company Logo
						<input
							type="file"
							hidden
							ref={fileRef}
							onChange={handleUploadImg}
						/>
					</button>
				</div>

				{imgError && (
					<span className="text-rose-600 text-sm">{inputError}</span>
				)}
				<InputField
					eld
					name={"companyName"}
					label={"company name"}
					type={"text"}
					handleChildValue={handleInputValues}
				/>
				<InputField
					name={"companyMail"}
					label={"company email"}
					type={"email"}
					handleChildValue={handleInputValues}
				/>
				<InputField
					name={"companyContact"}
					label={"company contact"}
					type={"number"}
					handleChildValue={handleInputValues}
				/>
				<div className="my-2">
					<h1 className="mb-3 capitalize text-sm font-semibold">
						Industry Type
					</h1>
					<MultiLists
						name={"industryType"}
						title={"industry type"}
						handleChildValue={handleMultiLists}
					/>
				</div>

				<div className="flex justify-end gap-3 mt-2">
					<Link
						to={"/employer"}
						className="px-4  flex items-center justify-center bg-[#673ab7] text-sm text-white font-semibold  rounded-lg">
						Skip
					</Link>

					<button
						type="submit"
						onClick={handleSubmitBtn}
						className="px-4 py-1 flex justify-center items-center bg-green-600 text-white text-sm font-semibold  rounded-lg">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default InformationForm;
