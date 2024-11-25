import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCompany } from "../../apis/employerApi";
import SingleCompanyHead from './../../components/employee/single-company/SingleCompanyHead';
import SingleCompanyBody from './../../components/employee/single-company/SingleCompanyBody';

function SingleCompany() {
	const { id } = useParams();
	const dispatch = useDispatch();

	  	useEffect(() => {
			dispatch(getCompany(id));
		}, [id, dispatch]);



	return (
		<div className="bg-white mt-20">
			<SingleCompanyHead />
			<div className="mx-[15px] md:mx-[30px] xl:mx-[50px]">
				<SingleCompanyBody />
			</div>
		</div>
	);
}

export default SingleCompany;
