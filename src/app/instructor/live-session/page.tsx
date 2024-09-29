import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import Room from "../../../components/LiveStream/Room/Room";
import React from "react";
import Heading from "../../../utils/Heading";
import { EISidebar } from "../../../constants/enums";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      {/* <InstructorProtected > */}
      <Heading
        title="Learnix - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="z-[9999] mx-auto flex">
        {/* <Sidebar active={EISidebar.live} /> */}

        <div className="w-full px-4">
          <Room />
        </div>
      </div>
      {/* </InstructorProtected> */}
    </div>
  );
};

export default Page;