"use client";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import DashboardHero from "../../../components/Instructor/DashboardHero";
import Heading from "../../../utils/Heading";
import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnBlockUserMutation,
} from "../../../../redux/features/admin/adminApi";
import { toast } from "sonner";
import BasicTable from "../../../utils/BasicTable";
import CustomActionModal from "@/components/Admin/viewModal/CustomActionModal";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [actionType, setActionType] = useState<"block" | "unblock">("block");

  const { isLoading, data, refetch } = useGetUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    blockUser,
    { isLoading: blockLoading, error: blockError, isSuccess: blockSuccess },
  ] = useBlockUserMutation();
  const [
    unBlockUser,
    {
      isLoading: unBlockLoading,
      error: unBlockError,
      isSuccess: unBlockSuccess,
    },
  ] = useUnBlockUserMutation();

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Joined At",
      accessorKey: "createdAt",
      cell: (info: any) => (
        <>
          {info?.row?.original.createdAt
            ? new Date(info.row.original.createdAt).toLocaleDateString()
            : ""}
        </>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => (
        <>{info.row.original.isBlocked ? "Blocked" : "Active"}</>
      ),
    },
    {
      header: "Action",
      cell: (info: any) => (
        <>
          {info.row.original.isBlocked ? (
            <button
              onClick={() => {
                setUserId(info.row.original._id);
                setActionType("unblock");
                setOpen(true);
              }}
              className="text-green-600 cursor-pointer"
            >
              Unblock
            </button>
          ) : (
            <button
              onClick={() => {
                setUserId(info.row.original._id);
                setActionType("block");
                setOpen(true);
              }}
              className="text-red-600 cursor-pointer"
            >
              Block
            </button>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (blockSuccess || unBlockSuccess) {
      toast.success(
        actionType === "block"
          ? "User blocked successfully"
          : "User unblocked successfully"
      );
      refetch();
    }

    if (blockError || unBlockError) {
      const error = blockError || unBlockError;
      if (error) {
        console.error("Error:", error);
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [blockSuccess, unBlockSuccess, blockError, unBlockError]);

  const handleAction = async () => {
    setOpen(false);
    const id = userId;
    try {
      if (actionType === "block") {
        const result = await blockUser({ id });
        console.log("Block User Result:", result);
      } else {
        const result = await unBlockUser({ id });
        console.log("Unblock User Result:", result);
      }
    } catch (error) {
      console.error("Action Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Heading
        title="Eduquest - Admin - Users"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          {/* <DashboardHero /> */}
          {data && (
            <div
              className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-sm overflow-hidden mx-28 p-4`}
            >
              <BasicTable datas={data} columns={columns} type="category" />
            </div>
          )}
        </div>
        <Sidebar active={1} />
      </div>
      {open && (
        <CustomActionModal
          open={open}
          setOpen={setOpen}
          handleFunction={handleAction}
          text={
            actionType === "block"
              ? "Are you sure you want to block this user?"
              : "Are you sure you want to unblock this user?"
          }
          confirmText={actionType === "block" ? "Block User" : "Unblock User"}
        />
      )}
    </div>
  );
};

export default Page;
