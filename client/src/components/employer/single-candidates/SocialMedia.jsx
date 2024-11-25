import React from "react";
import { BsBrowserChrome } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { LiaBehance } from "react-icons/lia";

function SocialMedia() {
	const { candidate } = useSelector((state) => state.employer);
	return (
		<div className="bg-customBgColor p-4 flex justify-between items-center shadow-md rounded-md">
			<h1 className="text-lg font-semibold tracking-wide">
				Social Media
			</h1>
			<div className="flex items-center gap-4">
				<a href={candidate?.socialLinks?.portfolio} target="_blank">
					<BsBrowserChrome
						className={`text-blue-300 hover:text-blue-500 text-lg ${
							candidate?.socialLinks?.portfolio &&
							"cursor-pointer"
						}`}
					/>
				</a>

				<a href={candidate?.socialLinks?.linkedin} target="_blank">
					<FaLinkedinIn
						className={`text-blue-300 hover:text-blue-500 text-lg ${
							candidate?.socialLinks?.linkedin && "cursor-pointer"
						}`}
					/>
				</a>

				<a href={candidate?.socialLinks?.behance} target="_blank">
					<LiaBehance
						className={`text-blue-300 hover:text-blue-500 text-lg ${
							candidate?.socialLinks?.behance && "cursor-pointer"
						}`}
					/>
				</a>

				<a href={candidate?.socialLinks?.github} target="_blank">
					<TbBrandGithubFilled
						className={`text-blue-300 hover:text-blue-500 text-lg ${
							candidate?.socialLinks?.github && "cursor-pointer"
						}`}
					/>
				</a>
			</div>
		</div>
	);
}

export default SocialMedia;
