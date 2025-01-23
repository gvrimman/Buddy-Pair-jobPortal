import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileById } from "../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";

function Container({ children }) {
  return (
    <div className="rounded-md shadow-md border py-2 px-2 text-gray-700 text-sm my-2">
      {children}
    </div>
  );
}

function ProfileView() {
  const { userInfo } = useSelector((state) => state.user);
  const { profile, isLoading } = useSelector((state) => state.employee);
  const { profileId } = useParams();
  const dispatch = useDispatch();

  const isOwnProfile = Boolean(!profileId);

  useEffect(() => {
    dispatch(getProfileById(profileId ? profileId : userInfo._id));
  }, [profileId, dispatch]);

  return (
    <div className="max-w-[900px] w-full">
      <Container>
        <div
          className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
            isLoading ? "block" : "hidden"
          }`}
        ></div>
        <span
          className={`text-theme-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
            isLoading ? "block" : "hidden"
          } `}
        >
          <TbLoader2 className="animate-spin text-lg" />
        </span>
        <div className="  flex items-baseline justify-between mb-3">
          <div className="overflow-hidden aspect-square border-2 border-theme-500 rounded-full w-16 h-16">
            <img
              className="w-full h-full object-cover"
              src={
                profile && profile?.apps?.jobPortal.profileImage
                  ? profile?.apps?.jobPortal.profileImage
                  : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png"
              }
              alt=""
            />
          </div>
        </div>
        <div className="flex gap-2 items-center mb-1">
          <h4 className="font-semibold text-md">{profile?.username}</h4>
          <span>|</span>
          <h5 className="font-medium text-md">
            {profile?.apps?.jobPortal?.locationName}
          </h5>
        </div>
        {/* <p className="text-xs my-2 font-medium px-2 rounded-xl bg-gray-300 text-gray-800 w-fit">
          2.5 Year
        </p> */}
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-xs">{profile?.apps?.jobPortal?.profession[0]}</p>
          <div className="flex items-center gap-2 ml-auto">
            {isOwnProfile && (
              <>
                <Link
                  title="Edit Profile"
                  to={"../edit/profile"}
                  className="text-xs text-nowrap text-theme-700 underline"
                >
                  Edit Profile
                </Link>
                <Link
                  title="Edit Company Profile"
                  to={"../edit/profile/company"}
                  className="text-xs text-nowrap text-theme-700 underline"
                >
                  Edit Company Profile
                </Link>
                <Link
                  title="Referral Program"
                  to={"referral"}
                  className="text-xs text-nowrap text-theme-700 underline"
                >
                  Referral Program
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
      <Container>
        <h4 className="font-medium text-sm my-2">About</h4>
        <p className="text-xs leading-5">{profile?.apps?.jobPortal?.about || "Not avaliable"}</p>
      </Container>
      <Container>
        <h4 className="font-medium text-sm my-2">Major Skills</h4>
        <div className="rounded-md flex gap-2 flex-wrap items-center">
          {profile?.apps?.jobPortal?.skills.length ? (
            profile?.apps?.jobPortal?.skills?.map((skill, index) => (
              <div
                key={index}
                className="bg-theme-50 text-theme-600 w-fit px-4 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </div>
            ))
          ) : (
            <div className="bg-theme-50 text-center text-theme-600 w-fit px-4 py-1 rounded-full text-xs font-medium">
              No skills added yet
            </div>
          )}
        </div>
      </Container>

      <Container>
        <h4 className="font-medium text-sm my-2">Works at</h4>
        <div>
          <p className="text-xs my-1">
            Company:{" "}
            <span className="font-semibold">
              {profile?.apps?.jobPortal?.companyName}
            </span>
          </p>
          <p className="text-xs my-1">
            Location:{" "}
            <span className="font-semibold">
              {profile?.apps?.jobPortal?.companyAddress}
            </span>
          </p>
        </div>
      </Container>
      {isOwnProfile && <Container>
        <h4 className="font-medium text-sm my-2">Contact</h4>
        <div>
          <p className="text-xs my-1">
            Email: <span className="font-semibold">{profile?.email}</span>
          </p>
          <p className="text-xs my-1">
            Phone: <span className="font-semibold">{profile?.phone}</span>
          </p>
        </div>
      </Container>}
    </div>
  );
}

export default ProfileView;
