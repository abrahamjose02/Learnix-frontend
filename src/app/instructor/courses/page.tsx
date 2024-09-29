"use client";
import BasicTable from "../../../utils/BasicTable";
import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import InstructorProtected from "../../../hooks/instructorProtected";
import Heading from "../../../utils/Heading";
import React, { useEffect, useState } from "react";
import { PencilIcon, Router, Trash2 } from "lucide-react";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import CustomDeleteModal from "@/components/ui/CustomDeleteModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

const CoursesPage = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const router = useRouter();

  const { isLoading, data, refetch } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isLoading: deleteLoading, error, isSuccess }] =
    useDeleteCourseMutation();

  const columns = [
    {
      header: "Course Title",
      accessorKey: "name",
    },
    {
      header: "Ratings",
      accessorKey: "ratings",
    },
    {
      header: "Purchased",
      accessorKey: "purchased",
    },
    {
      header: "CreatedAt",
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
      header: "Edit",
      cell: (info: any) => (
        <>
          <PencilIcon size={20} className="cursor-pointer" 
           onClick={() => router.push(`/instructor/edit-course/${info.row.original._id}`)}
          />
        </>
      ),
    },
    {
      header: "Delete",
      cell: (info: any) => (
        <>
          <Trash2
            size={20}
            onClick={() => {
              setOpen(true);
              setCourseId(info.row.original._id);
            }}
            className="cursor-pointer"
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course deleted Successfully");
      refetch()
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);
  const handleDelete = async () => {
    setOpen(!open);
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* <InstructorProtected> */}
      <Heading
        title="Eduwise - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          {data && (
            <div className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-sm overflow-hidden mx-28 p-4`}>
              <BasicTable datas={data} columns={columns} type="category" />
            </div>
          )}
        </div>
        <Sidebar active={1} />
      </div>
      {open && (
        <CustomDeleteModal
          open={open}
          setOpen={setOpen}
          handleFunction={handleDelete}
          text="Are you sure you want to delete this course?"
        />
      )}
      {/* </InstructorProtected> */}
    </div>
  );
};

export default CoursesPage;