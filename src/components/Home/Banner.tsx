"use client"
import { Badge } from "../Badge";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from "../SearchInput";

type Props = {
    setOpen: any
};

const Banner:React.FC<Props> = ({setOpen}) => {
    const {user} = useSelector((state:any) => state.auth)
  return (
    <div className="relative grid   1000px:-mt-[6rem] items-center justify-center  w-full h-full">
    <div className="absolute left-0   z-[9] text-black w-[60%] ml-[12%]">
      <div className="flex flex-col justify-center items-start 800px:text-[3.8vw]">
        <span className="text-center font-[1000] 800px:-mb-[20px] mt-6 800px:mt-0 ">
          The Best
        </span>
        <span className="font-[1000] 800px:-mb-[20px]">
          Platform Enroll
        </span>
        <span className="text-center 800px:-mb-[20px]">
          in Your Special
        </span>
        <span className="relative flex">
          <span className="bg-[#FDC021] w-full 800px:h-[1.3vh] absolute h-[.7vh] bottom-0 800px:bottom-4  z-[1]"></span>
          <span className="text-center z-[2]">
            Course
          </span>
        </span>
        <span className="text-xs 1100px:text-sm hidden 1000px:w-[50%] 1000px:block p-1 800px:-mb-[20px]">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </span>
        <div className="!z-[10] mt-10"><SearchInput /></div>
        <span onClick={() => setOpen(true)}>
          {!user && <Badge text="Get Started" arrow/>}
        </span>
      </div>
    </div>
    <img src="/assets/grow bb.png" className=" relative w-full " />
  </div>
  
  );
};

export default Banner;