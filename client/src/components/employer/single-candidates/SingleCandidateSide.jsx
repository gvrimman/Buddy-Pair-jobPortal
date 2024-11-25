import React from "react";
import { SlCalender } from "react-icons/sl";
import { GiSandsOfTime } from "react-icons/gi";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { PiGraduationCapLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import SmallBox from "../../common/SmallBox";

function SingleCandidateSide() {
	const { candidate } = useSelector((state) => state.employer);

	return (
		<div className=" bg-gray-100 p-5 grid gap-4 shadow-md rounded-md">
			<SmallBox
				icon={<SlCalender />}
				title={candidate?.jobDetails?.workExperience}
			/>
			<SmallBox icon={<GiSandsOfTime />} title={candidate?.age} />
			<SmallBox
				icon={<FaMoneyBill1Wave />}
				title={candidate?.jobDetails?.ctc || 0}
			/>
			<SmallBox
				icon={<FaMoneyBill1Wave />}
				title={candidate?.jobDetails?.eCtc || 0}
			/>
			{/* {candidate?.preference?.languages?.map((item, index) => (
				<SmallBox
					key={index}
					icon={<LiaLanguageSolid />}
					title={"English"}
				/>
			))} */}
			<SmallBox
				icon={<PiGraduationCapLight />}
				title={candidate?.qualification}
			/>
		</div>
	);
}

export default SingleCandidateSide;
