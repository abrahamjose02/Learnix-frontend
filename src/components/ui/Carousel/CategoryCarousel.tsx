import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetCategoriesQuery } from "../../../../redux/features/admin/adminApi";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type Props = {
  category: any;
  setCategory: any;
};

const CategoryCarousel = ({ category, setCategory }: Props) => {
  const { data: categories } = useGetCategoriesQuery(undefined, {});

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };


  const CustomButtonGroup = ({ next, previous }: any) => (
    <div className="carousel-button-group ml-[100%]  -mt-[2.3rem] flex 800px:gap-1  ">
       <button className="carousel-button text-gray-700 hover:bg-gray-400 p-2 rounded-full hidden 800px:block" onClick={previous}>
        <ArrowLeftIcon className="h-5" />
      </button>
      <button className="carousel-button  text-gray-700 hover:bg-gray-400 p-2 rounded-full hidden 800px:block" onClick={next}>
        <ArrowRightIcon className=" h-5 " />
      </button>
    </div>
  );

  return (


      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButtonGroup />}
      >
        <div
        className={`h-[35px] text-xs hover:text-white hover:bg-gray-900 text-black ${
          category === "All" ? "bg-gray-900 text-white" : "bg-gray-200"
        } mt-6 800px:mr-4 mr-2 ml-2 px-4  rounded-xl flex items-center justify-center font-Poppins cursor-pointer`}
        onClick={() => setCategory("All")}
      >
        All
      </div>
        {categories &&
          categories.map((item: any, index: number) => (
            <div key={index}>
              <div
                className={`h-[35px] text-xs hover:text-white hover:bg-gray-900 ${
                  category === item.category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200"
                } mt-6 mr-8 px-2 rounded-xl flex items-center justify-center font-Poppins cursor-pointer text-black`}
                onClick={() => setCategory(item.category)}
              >
                {item.category}
              </div>
            </div>
          ))}
      </Carousel>
  );
};

export default CategoryCarousel;