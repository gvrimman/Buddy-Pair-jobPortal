import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { showError, showSuccess } from "../../utils/toast";
import { setUser } from "../../Redux/reducers/userReducer";
import TextInput from "../../components/common/TextInput";

function UserResume({ onClose, setUserData, userData }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [pdfFile, setPdfFile] = useState(null);
	const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === "application/pdf") {
			setPdfPreviewUrl(URL.createObjectURL(file));
			setPdfFile(file);
		} else {
			console.log("Invalid file type");
		}
	};

	const handleSubmit = async () => {
		try {
			if (!pdfFile) {
				showError("pls select pdf file");
				return;
			}
			const finalData = {
				...userData,
				resume: pdfFile,
			};

			const response = await axiosInstance.post(
				"/auth/employee-signup",
				finalData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			onClose();
			navigate("/job-portal/employee");
			showSuccess(response.data?.message);
		} catch (error) {
			console.log(error);
			showError(error.response?.data?.message);
		}
	};
	return (
		<div className="flex flex-col gap-4 px-1 py-5">
			<div className="relative text-center">
				<h1 className="text-customViolet text-lg md:text-2xl font-bold">
					Resume
				</h1>
				<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
					Upload your resume.
				</p>
			</div>
			{pdfPreviewUrl && (
				<div className="h-[50vh] overflow-hidden">
					<Worker
						workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
						<Viewer
							initialPage={0}
							pageLayout={"single"}
							fileUrl={pdfPreviewUrl}
						/>
					</Worker>
				</div>
			)}
			<div>
				<input
					type={"file"}
					className="w-fit border rounded-md p-1 bg-transparent text-sm text-cyan-900 hover:text-blue-900 hover:border-blue-500 cursor-pointer"
					accept="application/pdf"
					onChange={handleFileChange}
				/>
			</div>

			<div className="text-end">
				<Button className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
					Close
				</Button>
				<Button
					onClick={handleSubmit}
					type="submit"
					className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-customViolet">
					Next
				</Button>
			</div>
		</div>
	);
}

export default UserResume;
