import React from "react";
import useListenNotification from "../../hooks/useListenNotification";
import { useDispatch, useSelector } from "react-redux";
import { markAsReadNotification } from "../../apis/notificationApi";
import { useNavigate } from "react-router-dom";

function Notification() {
  const { notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useListenNotification()

  const handleRead = (id, link) => {
    dispatch(markAsReadNotification(id));
    navigate(`/job-portal/${link}`);
  };
  return (
    <div className="bg-white p-4 grid gap-4 rounded-md shadow">
      <h1 className="text-xl font-semibold tracking-wider">Notifications</h1>
      {/* card container */}
      <div className="grid gap-3 md:grid-cols-2">
        {/* single card */}
        {notifications?.map((notification, i) => (
          <div
            key={i}
            onClick={() => handleRead(notification?._id, notification?.link)}
            className="flex items-center gap-3 border border-purple-100 hover:border-customViolet hover:border-2 px-3 py-2 rounded transition cursor-pointer relative"
          >
            <div className="w-16 md:w-20 aspect-square overflow-hidden rounded-full">
              <img
                className="w-full h-full object-cover"
                src={notification?.senderId?.apps?.jobPortal?.profileImage}
                alt=""
              />
            </div>
            <div>
              <p className="font-semibold text-base md:text-lg">
                {notification?.senderId?.username}
              </p>
              <p className="text-sm text-gray-700">{notification?.message}</p>
            </div>
            <span className="text-sm ml-auto font-medium text-gray-700">
              {notification.createdAt?.slice(0, 10)}
            </span>
            {!notification?.isRead && (
              <div className="w-3 absolute top-2 right-2 rounded-full aspect-square bg-customViolet"></div>
            )}
          </div>
        ))}
      </div>
      {!notifications.length && (
        <h3 className="p-4 font-bold text-xl text-center text-purple-500 flex justify-center items-center">
          Nothing to show
        </h3>
      )}
    </div>
  );
}

export default Notification;
