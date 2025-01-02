import { Button } from "@material-tailwind/react";
import React from "react";
import { FaUserPlus } from "react-icons/fa6";

function Container({ children }) {
	return (
		<div className="rounded-md shadow-md border py-2 px-2 text-gray-700 text-sm my-2">
			{children}
		</div>
	);
}

function ProfileView() {
	return (
		<div className="max-w-[900px]">
			<Container>
				<div className="  flex items-baseline justify-between mb-3">
					<div className="overflow-hidden aspect-square border-2 border-customViolet rounded-full w-16 h-16">
						<img
							className="w-full h-full object-cover"
							src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
							alt=""
						/>
					</div>

					<Button className="text-2xl text-purple-800 w-fit bg-transparent shadow-none hover:shadow-none">
						<FaUserPlus />
					</Button>
				</div>
				<div className="flex gap-2 items-center mb-1">
					<h4 className="font-semibold text-md">Jon Doe</h4>
					<span>|</span>
					<h5 className="font-medium text-md">Vayanad</h5>
				</div>
				<p className="text-xs">Mernstack Developer</p>
				<p className="text-xs my-2 font-medium px-2 rounded-xl bg-gray-300 text-gray-800 w-fit">
					2.5 Year
				</p>
			</Container>
			<Container>
				<h4 className="font-medium text-sm my-2">About</h4>
				<p className="text-xs leading-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Reiciendis quidem ipsum voluptas incidunt pariatur culpa
					eaque impedit. Repellat quidem quibusdam nesciunt aspernatur
					sapiente suscipit deserunt, totam, natus iusto odit veniam?
				</p>
			</Container>
			<Container>
				<h4 className="font-medium text-sm my-2">Major Skills</h4>
				<div className="rounded-md flex gap-2 flex-wrap items-center">
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-xs font-medium">
						html
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-xs font-medium">
						css
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-xs font-medium">
						java
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-xs font-medium">
						html
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-xs font-medium">
						css
					</div>
					<div className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-xs font-medium">
						java
					</div>
				</div>
			</Container>

			<Container>
				<h4 className="font-medium text-sm my-2">Works at</h4>
				<div>
					<p className="text-xs my-1">
						Company:{" "}
						<span className="font-semibold">abc private ltd</span>
					</p>
					<p className="text-xs my-1">
						Location:{" "}
						<span className="font-semibold">Thrichur</span>
					</p>
				</div>
			</Container>
			<Container>
				<h4 className="font-medium text-sm my-2">Contact</h4>
				<div>
					<p className="text-xs my-1">
						Email:{" "}
						<span className="font-semibold">abc@gmail.com</span>
					</p>
					<p className="text-xs my-1">
						Phone: <span className="font-semibold">5825698545</span>
					</p>
				</div>
			</Container>
		</div>
	);
}

export default ProfileView;
