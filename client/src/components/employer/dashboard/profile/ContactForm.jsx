import React, { useState } from "react";
import InputForms from "../../../common/InputForms";
import { Button } from "@material-tailwind/react";

function ContactForm({ infos }) {


	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow">
			<h2 className="py-2 text-lg tracking-wide font-semibold">
				Contact Information
			</h2>

			<div className="mt-4 grid lg:grid-cols-2 gap-3">
				<InputForms
					title={"Street"}
					type={"text"}
					placeText={"South Kalamassery"}
					name={"street"}
				/>
				<InputForms
					title={"City"}
					type={"text"}
					placeText={"Kochi"}
					name={"city"}
				/>
				<InputForms
					title={"State"}
					type={"text"}
					placeText={"Kerala"}
					name={"state"}
				/>
				<InputForms
					title={"Zip"}
					type={"text"}
					placeText={"682033"}
					name={"zip"}
				/>
				<InputForms
					title={"Country"}
					type={"text"}
					placeText={"India"}
					name={"country"}
				/>
				<div className="lg:col-span-2">
					<InputForms
						title={"Complete Address"}
						type={"text"}
						placeText={
							"S 107, 4th Floor Monlash Business Centre Crescens Tower, South Kalamassery, Kochi, Kerala 682033, India"
						}
						name={"fullAddress"}
					/>
				</div>
			</div>
			<Button>Save</Button>
			{/* <FormButton text={"Save"} saveParentValue={handleContactsSave} /> */}
		</div>
	);
}

export default ContactForm;
