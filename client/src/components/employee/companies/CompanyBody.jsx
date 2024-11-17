import React, { useEffect } from "react";
import { GrView } from "react-icons/gr";
import { GrLocation } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";

function CompanyBody() {
	const companies = null;

	return (
		<div className="grid gap-4 my-5">
			{companies?.map((company, index) => (
				<div
					key={index}
					className="bg-white flex justify-between items-start p-4 border rounded-lg shadow-lg">
					<div className="grid md:flex gap-3">
						<div className="">
							<img
								src={company.companyLogo}
								className="w-12 h-12 object-cover rounded-lg"
							/>
						</div>
						<div className="grid gap-3">
							<h1 className="text-lg font-semibold tracking-wider">
								{company.companyName}
							</h1>

							<div className="flex gap-3">
								<div className="flex gap-2 items-center">
									<span className="text-lg">
										<MdOutlineEmail />
									</span>
									<p className="text-sm sm:text-base">
										{company.companyMail}
									</p>
								</div>
								<div className="flex gap-2 items-center">
									<span className="text-lg font-semibold">
										<GrLocation />
									</span>
									<p className="text-sm sm:text-base capitalize">
										{company.companyAddress?.city}
									</p>
								</div>
							</div>

							<div className="flex flex-wrap gap-3">
								{company.industryType?.map((type, index) => (
									<div
										key={index}
										className="w-fit px-3 py-1 text-sm tracking-wide odd:bg-blue-100 text-blue-500 even:bg-green-100 even:text-green-500 rounded-xl">
										{type}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="transform -translate-y-2">
						<button
							onClick={() =>
								navigate(
									`/job-portal/employee/company/${company._id}`
								)
							}
							className="w-10 h-10 flex justify-center items-center text-lg text-blue-500 hover:bg-slate-200 hover:animate-pulse rounded-full">
							<GrView />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default CompanyBody;
