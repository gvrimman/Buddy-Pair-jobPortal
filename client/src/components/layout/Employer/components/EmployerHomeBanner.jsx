import React from "react";

import banner from "/assets/images/employeebanner.jpg";
import LargeSearch from "./LargeSearch";
import NormalSearch from "./NormalSearch";

function EmployerHomeBanner() {
	return (
		<div
			className="w-full h-screen bg-cover bg-center"
			style={{ backgroundImage: `url(${banner})` }}>
			<div className="max-w-[1440px] h-full mx-auto px-7 flex flex-col justify-center gap-3 ">
				<div className="w-full md:w-[35%] lg:w-[25%] flex flex-col gap-4">
					<h3 className="uppercase  text-xl lg:text-4xl font-bold antialiased text-[#673ab7]">
						Hire Talent Beyond Your Boarders.
					</h3>
					<p className="hidden lg:block ms-2 capitalize text-sm antialiased font-medium">
						modern high quality and comfortable available on our
						stores modern high quality comfort.
					</p>
				</div>

				<LargeSearch />
				<NormalSearch />
			</div>
		</div>
	);
}

export default EmployerHomeBanner;
