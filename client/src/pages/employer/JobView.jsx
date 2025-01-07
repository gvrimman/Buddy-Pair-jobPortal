import { Button } from "@material-tailwind/react";
import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSelector } from "react-redux";

function JobView() {
	const { isAuthenticated } = useSelector((state) => state.user);
	console.log()
	return (
		<div className="max-w-[900px]">
			<div className=" py-2 px-2 rounded-md shadow-md border text-gray-700 text-sm">
				<h4 className="text-center font-semibold text-md">
					Mern Stack Developer
				</h4>
			</div>
			<div className="my-4  shadow-lg border py-3 px-2 rounded-md text-sm leading-6">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Repudiandae, neque voluptates doloremque, eveniet aperiam a
					cum eius hic numquam laborum provident eum corporis atque
					repellat dolore quibusdam, nobis necessitatibus consectetur.
				</p>
			</div>

			<div className="md:grid md:grid-cols-2 md:gap-5">
				<div className="my-4 shadow-lg border py-3 px-2 rounded-md flex gap-2 flex-wrap items-center">
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						html
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						css
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						java
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						html
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						css
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						java
					</div>
				</div>

				<div className="my-4 shadow-lg border py-3 px-2 rounded-md flex items-center gap-2">
					<div className="flex items-center gap-1 bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						<span>
							<FaIndianRupeeSign />
						</span>
						<span>25000</span>
					</div>
					<span>-</span>
					<div className="flex items-center gap-1 bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						<span>
							<FaIndianRupeeSign />
						</span>
						<span>25000</span>
					</div>
				</div>

				<div className="my-4  py-3 px-2 rounded-md bg-gray-300 text-gray-700 text-sm">
					<p className="font-normal leading-7">
						Experience:{" "}
						<span className="font-semibold">Fresher</span>
					</p>
					<p className="font-normal leading-7">
						Location:{" "}
						<span className="font-semibold">Trivandrum</span>
					</p>
					<p className="font-normal leading-7">
						Application Deadline:{" "}
						<span className="font-semibold">10/10/2024</span>
					</p>
					<p className="font-normal leading-7">
						Notice Period:{" "}
						<span className="font-semibold">immedate join</span>
					</p>
				</div>
			</div>
			<div className="my-4 flex items-center gap-3">
				<Button className="bg-customViolet ">apply</Button>
				<div className="border border-gray-500 flex items-center gap-2 px-2 py-1 rounded-md w-full">
					<div className="overflow-hidden aspect-square border border-gray-300 rounded-full w-8">
						<img
							className="w-full h-full object-cover"
							src="https://images.freeimages.com/fic/images/icons/2463/glossy/512/user_female.png"
						/>
					</div>
					<div>
						<p className="text-xs line-clamp-1">
							abc privat company limit eramkulam
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobView;
