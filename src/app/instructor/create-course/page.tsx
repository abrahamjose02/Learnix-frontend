"use client";
import InstructorProtected from "../../../hooks/instructorProtected";
import React from "react";
import Heading from "../../../utils/Heading";
import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import DashboardHero from "../../../components/Instructor/DashboardHero";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const CreateCourse = dynamic(
  () => {
    return import("../../../components/Instructor/CreateCourse/CreateCourse");
  },
  { ssr: false }
);

type Props = {};

const CreateCoursePage = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <InstructorProtected>
      <Heading
        title="Learnix - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="z-[9999] mx-auto flex">
        <div className="mx-auto ml-10 mr-0 pl-10 800px:mr-16  800px:w-[80%] 800px:px-[100px]">
          <div className="z-[99] mb-10">
            {user && <DashboardHero instructorId={user._id} />}
          </div>
          <CreateCourse />
        </div>
        <Sidebar active={0} />
      </div>
    </InstructorProtected>
  );
};

export default CreateCoursePage;