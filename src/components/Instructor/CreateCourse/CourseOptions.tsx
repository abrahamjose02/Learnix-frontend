import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: React.FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div className="font-Poppins 800px:pl-2 ">
      {options.map((option: any, index: number) => (
        <div key={index} className={"w-full flex py-5"}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-gradient-to-tr from-indigo-200 to-indigo-400" : "bg-gray-800"
            } relative `}
          >
            <IoMdCheckmark className="text-[16px] text-white" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-gradient-to-tr from-indigo-200 to-indigo-100" : "bg-gray-800"
                } bottom-[-100%] `}
              />
            )}
          </div>
          <h5
          className={`pl-3 ${
            active === index 
            ? "dark:text-white text-black"
            : "dark:text-white text-black"}
            800px:text-[16px] hidden 800px:block`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;