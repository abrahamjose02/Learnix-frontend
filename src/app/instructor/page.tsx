"use client";
import DashboardWidgets from "@/components/Instructor/Widgets/DashboardWidgets";
import DashboardHero from "@/components/Instructor/DashboardHero";
import Sidebar from "../../components/Instructor/Sidebar/Sidebar";
import { EISidebar } from "../../constants/enums";
import Heading from "../../utils/Heading";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* <InstructorProtected> */}
      <Heading
        title="Learnix - Instructor | Order Analytics"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <div className="z-[99]">
            {user && (
              <>
                <DashboardHero instructorId={user._id} />
                {/* dashboard */}
                <DashboardWidgets open={true} instructorId={user._id} />
              </>
            )}
          </div>
          {/* <OrderAnalytics /> */}
        </div>
        <Sidebar active={EISidebar.dashboard} />
      </div>
      {/* </InstructorProtected> */}
    </div>
  );
};

export default Page;
