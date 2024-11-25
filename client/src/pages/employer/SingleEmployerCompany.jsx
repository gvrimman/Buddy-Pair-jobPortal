import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import CompanyHead from '../../components/employer/single-company/CompanyHead';
import CompanyBody from '../../components/employer/single-company/CompanyBody';
import { getCompany } from '../../apis/employerApi';

function SingleEmployerCompany() {
  const { id } = useParams();
  const dispatch = useDispatch();

  	useEffect(() => {
		dispatch(getCompany(id));
	}, [id, dispatch]);

  return (
    <div className="bg-white mt-20">
      <CompanyHead />
      <div className="mx-[15px] md:mx-[30px] xl:mx-[50px]">
        <CompanyBody />
      </div>
    </div>
  )
}

export default SingleEmployerCompany