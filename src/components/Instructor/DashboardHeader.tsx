"use client";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  useGetAllNotificationQuery,
  useUpdateNotificationMutation,
} from "../../../redux/features/notification/notificationApi";
import { formatDate } from "../../utils/FormatDate";
const isClient = typeof window !== "undefined";
let toast: { message: (arg0: string, arg1: { position: string }) => void };
if (isClient) {
  toast = require("sonner").toast;
}

type Props = {
  instructorId?: string;
};

const DashboardHeader = ({ instructorId }: Props) => {
  const { data, refetch } = useGetAllNotificationQuery(instructorId, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const handleNotificationStatus = async (id: string) => {
    await updateNotificationStatus(id);
  };

  useEffect(() => {
    if (data) {
      setNotifications(data.filter((item: any) => item.status === "unread"));
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isClient) {
      const socketId = require("@/utils/socket").socketId;
      const toast = require("sonner").toast;

      socketId.on("newNotification", (data: any) => {
        if (data.instructorId === instructorId) {
          refetch();
          toast.message(`${data.title} received`, {
            position: "bottom-right",
          });
        }
      });
    }
  }, [isClient, instructorId]);
  return (
    <div className="fixed right-0 top-0 !z-[1] flex w-full items-center justify-end bg-white p-5 shadow-sm">
      <div
        className="relative mr-8 cursor-pointer "
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="cursor-pointer text-2xl text-black" />
        <span className="absolute -right-2 -top-2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#3ccba0] text-xs text-white">
          {notifications?.length}
        </span>
      </div>
      {open && (
        <div className="absolute top-16 z-[9999] h-[50vh] w-[350px] rounded bg-white shadow-xl dark:bg-[#111C43]">
          <h5 className="mb-2 text-center font-Poppins text-lg text-black dark:text-white">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                key={index}
                className="border-b border-b-[#0000000f] bg-[#00000013] px-2 py-1 font-Poppins dark:border-b-[#ffffff47] dark:bg-[#2d3a4ea1]"
              >
                <div className="flex w-full items-center justify-between p-2">
                  <p className="text-xs text-black dark:text-white">
                    {item.title}
                  </p>
                  <p
                    className="cursor-pointer text-xs text-black dark:text-white"
                    onClick={() => handleNotificationStatus(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-xs text-black dark:text-white">
                  {item.message}
                </p>
                <p className="p-2 text-xs text-gray-600 dark:text-white">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
