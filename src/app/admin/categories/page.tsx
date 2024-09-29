"use client";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import DashboardHero from "../../../components/Instructor/DashboardHero";
import Heading from "../../../utils/Heading";
import React from "react";
import AdminProtected from "../../../hooks/adminProtected";
import EditCategories from "@/components/Admin/Customization/EditCategories";

type Props = {};

const page = (props: Props) => {
  
  return (
    // <AdminProtected>
      <div className="min-h-screen bg-gray-200">
        <Heading
          title="Learnix - Admin | Categories"
          description="Platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux"
        />
        <div className="flex mx-auto z-[9999]">
          <div className="mx-auto pl-14 mt-20 w-[85%] ">
            <DashboardHero />
            <EditCategories />


          </div>
          <Sidebar active={4} />
        </div>
        
      </div>
    // </AdminProtected>
  );
};

export default page;