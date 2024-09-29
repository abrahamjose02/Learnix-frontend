"use client";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import DashboardHero from "../../../components/Instructor/DashboardHero";
import Heading from "../../../utils/Heading";
import React, { useEffect, useState } from "react";
import {
  useGetInstructorsQuery,
  useGetInstructorDataQuery,
  useVerifyInstructorMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
} from "../../../../redux/features/admin/adminApi";
import { toast } from "sonner";
import BasicTable from "../../../utils/BasicTable";
import CustomActionModal from "@/components/Admin/viewModal/CustomActionModal";
import CustomVerifyModal from "@/components/Admin/viewModal/CustomVerifyModal";
import ViewModal from "@/components/Admin/viewModal/viewModal";

type Props = {};

const Page = (props: Props) => {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [userId, setUserId] = useState("");
  const [actionType, setActionType] = useState<"block" | "unblock">("block");
  const [selectedInstructorId, setSelectedInstructorId] = useState<
    string | null
  >(null);

  const { isLoading, data, refetch } = useGetInstructorsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [
    verifyUser,
    { isLoading: verifyLoading, isSuccess: verifySuccess, error: verifyError },
  ] = useVerifyInstructorMutation();

  const [
    blockInstructor,
    { isLoading: blockLoading, error: blockError, isSuccess: blockSuccess },
  ] = useBlockUserMutation();

  const [
    unBlockInstructor,
    {
      isLoading: unBlockLoading,
      error: unBlockError,
      isSuccess: unBlockSuccess,
    },
  ] = useUnBlockUserMutation();

  const { data: instructorData } = useGetInstructorDataQuery(
    selectedInstructorId || "",
    {
      skip: !selectedInstructorId,
    }
  );

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
      header: "Verified",
      accessorKey: "isVerified",
      cell: (info: any) => (
        <span
          onClick={() => {
            if (!info.row.original.isVerified) {
              setUserId(info.row.original._id);
              setOpenVerify(true);
            }
          }}
          className={`${
            info.row.original.isVerified
              ? "text-green-500"
              : "text-red-500 cursor-pointer"
          }`}
        >
          {info.row.original.isVerified ? "Verified" : "Verify"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (info: any) => (
        <div className="flex items-center">
          <span
            onClick={() => {
              setSelectedInstructorId(info.row.original._id);
              setOpenViewModal(true);
            }}
            className="mr-4 text-blue-500 cursor-pointer"
          >
            View
          </span>
          {info.row.original.isBlocked ? (
            <button
              onClick={() => {
                setUserId(info.row.original._id);
                setActionType("unblock");
                setOpenActionModal(true);
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
                setOpenActionModal(true);
              }}
              className="text-red-600 cursor-pointer"
            >
              Block
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (blockSuccess || unBlockSuccess) {
      toast.success(
        actionType === "block"
          ? "Instructor blocked successfully"
          : "Instructor unblocked successfully"
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

  useEffect(() => {
    if (verifySuccess) {
      toast.success("Instructor verified successfully");
      refetch();
    }
    if (verifyError) {
      if ("data" in verifyError) {
        const errorMessage = verifyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [verifySuccess, verifyError]);

  const handleAction = async () => {
    setOpenActionModal(false);
    const id = userId;
    try {
      if (actionType === "block") {
        await blockInstructor({ id });
      } else {
        await unBlockInstructor({ id });
      }
    } catch (error) {
      console.error("Action Error:", error);
    }
  };

  const handleVerifyUser = async () => {
    setOpenVerify(false);
    await verifyUser({ id: userId });
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Heading
        title="Learnix - Admin | Instructors"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          {/* <DashboardHero /> */}
          {data && (
            <div
              className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-sm overflow-hidden mx-28 p-4 mt-8`}
            >
              <BasicTable datas={data} columns={columns} type="category" />
            </div>
          )}
        </div>
        <Sidebar active={2} />
      </div>
      {openActionModal && (
        <CustomActionModal
          open={openActionModal}
          setOpen={setOpenActionModal}
          handleFunction={handleAction}
          text={
            actionType === "block"
              ? "Are you sure you want to block this instructor?"
              : "Are you sure you want to unblock this instructor?"
          }
          confirmText={
            actionType === "block" ? "Block Instructor" : "Unblock Instructor"
          }
        />
      )}
      {openVerify && (
        <CustomVerifyModal
          open={openVerify}
          setOpen={setOpenVerify}
          handleFunction={handleVerifyUser}
          text="Are you sure you want to verify this instructor?"
        />
      )}
      {openViewModal && (
        <ViewModal
          open={openViewModal}
          setOpen={setOpenViewModal}
          instructorData={instructorData}
        />
      )}
    </div>
  );
};

export default Page;
