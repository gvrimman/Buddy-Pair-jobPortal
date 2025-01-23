import React from "react";
import { BsBrowserChrome } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { LiaBehance } from "react-icons/lia";

function SocialMedia() {
  const { candidate } = useSelector((state) => state.employer);

  return (
    <div className="bg-customBgColor p-4 flex flex-col justify-between items-center shadow-md rounded-md gap-2">
      <h1 className="text-lg font-semibold tracking-normal text-nowrap">Social Media</h1>
      <div className="flex items-center gap-4">
        {[
          {
            link: candidate?.socialLinks?.portfolio,
            icon: <BsBrowserChrome />,
          },
          { link: candidate?.socialLinks?.linkedin, icon: <FaLinkedinIn /> },
          { link: candidate?.socialLinks?.behance, icon: <LiaBehance /> },
          {
            link: candidate?.socialLinks?.github,
            icon: <TbBrandGithubFilled />,
          },
        ].map((social, index) =>
          social.link ? (
            <a key={index} href={social.link} target="_blank" rel="noreferrer">
              <div className="text-theme-300 hover:text-theme-500 text-lg cursor-pointer">
                {social.icon}
              </div>
            </a>
          ) : null
        )}
      </div>
    </div>
  );
}


export default SocialMedia;
