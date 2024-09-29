import React from "react";
import Carousell from "../ui/Carousel/Carousel";

type Props = {};

const Categories = (props: Props) => {
  return (
    <div
      className=" w-full flex flex-col pb-12 800px:pb-36 text-black"
      style={{ backgroundImage: "url(/assets/category.png)" }}
    >
      <div className="items-center justify-center flex flex-col 800px:py-20 py-6 gap-2">
        <h1 className="800px:text-[3vw]  font-[1000] text-center  800px-mb-[20px] -mb-[10px]">
          Expand Your Career
        </h1>
        <h1 className="800px:text-[2.7vw] text-center -mb-8px 800px:-mb-[20px]">
          With Our Courses
        </h1>
      </div>
      <div className="pl-[25%] pr-[3%] ">
        <Carousell />
      </div>
    </div>
  );
};

export default Categories;