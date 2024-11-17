import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

function SingleCompanyBox({ company }) {
  return (
    <div className="p-4 bg-[#e3f2fd] h-fit ">
      <table className="w-full border-separate border-spacing-3">
        <tbody>
          <tr>
            <th className="text-left text-sm sm:text-base">Primary industry</th>
            <th>:</th>
            <td className="flex items-center text-sm sm:text-base">
              {company?.industryType[0]}
            </td>
          </tr>
          <tr>
            <th className="text-left text-sm sm:text-base">Company size</th>
            <th>:</th>
            <td className="flex items-center text-sm sm:text-base">
              {company?.companyTeamSize}
            </td>
          </tr>
          <tr>
            <th className="text-left text-sm sm:text-base">Founded in</th>
            <th>:</th>
            <td className="flex items-center text-sm sm:text-base">
              {company?.founded}
            </td>
          </tr>
          <tr>
            <th className="text-left text-sm sm:text-base">Phone</th>
            <th>:</th>
            <td className="flex items-center text-sm sm:text-base">
              {company?.companyContact}
            </td>
          </tr>
          <tr>
            <th className="text-left text-sm sm:text-base">Mail</th>
            <th>:</th>
            <td className="flex items-center text-sm sm:text-base">
              {company?.companyMail}
            </td>
          </tr>
          <tr>
            <th className="text-left text-sm sm:text-base">Location</th>
            <th>:</th>
            <td className="flex items-center text-sm sm:text-base">
              {company?.companyAddress?.city} , {company?.companyAddress?.state}
            </td>
          </tr>
          <tr>
            <th className="text-left text-sm sm:text-base">Social media</th>
            <th>:</th>
            <td className="h-full flex gap-2 items-center text-sm sm:text-base">
              <a href={company?.socialMedia?.twitter}>
                <FaTwitter className="text-blue-500" />
              </a>
              <a href={company?.socialMedia?.linkedin}>
                <FaLinkedinIn className="text-blue-500" />
              </a>
              <a href={company?.socialMedia?.instagram}>
                <FaInstagram className="text-pink-500" />
              </a>
              <a href={company?.socialMedia?.facebook}>
                <FaFacebookF className="text-blue-500" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <button className="w-full mt-3 lowercase bg-blue-600 hover:bg-blue-800  text-white py-2 rounded-md  transition-colors duration-200">
        <a href={company?.companyWebSite}>{company?.companyWebSite}</a>
      </button>
    </div>
  );
}

export default SingleCompanyBox;
