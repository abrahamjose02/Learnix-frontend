"use client";
import FileUpload from "../../../components/Instructor/Upload/FileUpload";
import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import Heading from "../../../utils/Heading";
import React, { useEffect, useState } from "react";
import BasicTable from "@/utils/BasicTable";
import { Trash2 } from "lucide-react";
import { styles } from "@/styles/style";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import CopyModal from "@/components/Instructor/Upload/CopyModal";
import CustomDeleteModal from "@/components/ui/CustomDeleteModal";

type Props = {};

const UploadMedia = (props: Props) => {
  const [data, setData] = useState([]);
  const [isPolling, setIsPolling] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    videoUrl: "",
    subtitleUrl: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://app.learnixelearn.shop/api/transcode/deleteData/${editData.id}`,
        {
          withCredentials: true,
        }
      );
      setDeleteModal(false);
      fetchData();
    } catch (e: any) {
      console.log("error while deleting");
    }
  };

  const columns = [
    {
      header: "Video Title",
      accessorKey: "fileName",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => (
        <div className="relative flex items-center gap-2">
          {info.row.original.status !== "completed" &&
          info.row.original.status !== "Error occured" &&
          info.row.original.status !== "Uploaded" ? (
            <div className="relative inline-flex">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full absolute   animate-ping"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full absolute   animate-pulse"></div>
            </div>
          ) : null}
          <span>{info.row.original.status}</span>
        </div>
      ),
    },
    {
      header: "createdAt",
      accessorKey: "createdAt",
      cell: (info: any) => (
        <>
          {info.row.original.createdAt
            ? new Date(info.row.original.createdAt).toLocaleDateString()
            : ""}
        </>
      ),
    },
    {
      header: "Delete",
      cell: (info: any) => (
        <div className="hover:text-black">
          <Trash2
            size={20}
            onClick={() => {
              setDeleteModal(true);
              setEditData({ ...editData, id: info.row.original._id });
            }}
            className="cursor-pointer"
          />
        </div>
      ),
    },
    {
      header: "View",
      cell: (info: any) =>
        info.row.original.status === "Uploaded" && (
          <div className="hover:text-black">
            <EllipsisVerticalIcon
              onClick={() => {
                setOpen(true);
                setEditData({
                  ...editData,
                  videoUrl: info.row.original.videoUrl,
                  subtitleUrl: info.row.original.subtitleUrl,
                });
              }}
              className="cursor-pointer w-7 "
            />
          </div>
        ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
       ` https://app.learnixelearn.shop/api/transcode/getData`,
        { withCredentials: true }
      );
      setData(response.data);
      console.log("Response data", response.data);
      const allUploaded = response.data.every(
        (item: { status: string }) => item.status === "Uploaded"
      );
      if (!allUploaded) {
        setIsPolling(true);
      } else {
        setIsPolling(false);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    let interval: NodeJS.Timeout;

    if (isPolling) {
      interval = setInterval(fetchData, 20000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPolling]);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* <InstructorProtected> */}
      <Heading
        title="Learnix - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <div
            className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-sm overflow-hidden 800px:mx-28 p-8 flex flex-col gap-8`}
          >
            <h5
              className={`${styles.title} uppercase tracking-wider !pb-0 flex flex-col gap-2 font-semibold border-gray-600 shadow-sm p-10 !text-[18px] rounded-md`}
            >
              Upload Media
            </h5>
            <FileUpload fetchData={fetchData} />
            <span className="text-xs border border-gray-500 pt-4 shadow-md !rounded-md">
              <BasicTable columns={columns} datas={data} type="" />
            </span>
          </div>
        </div>
        <Sidebar active={3} />
      </div>

      {open && (
        <CopyModal
          open={open}
          setOpen={setOpen}
          subtitleUrl={editData.subtitleUrl}
          videoUrl={editData.videoUrl}
        />
      )}
      {deleteModal && (
        <CustomDeleteModal
          setOpen={setDeleteModal}
          open={deleteModal}
          handleFunction={handleDelete}
          text="Do you want to delete this data?"
        />
      )}
    </div>
  );
};

export default UploadMedia;
