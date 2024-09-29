import React from "react";
import { useGetUserCoursesQuery } from "../../../redux/features/courses/coursesApi";
import { CourseCard } from "../ui/Carousel/Carousel";

type Props = {};

const EnrolledCourses = (props: Props) => {
  const { data } = useGetUserCoursesQuery("", {});
  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0 ">
      <h1 className="block !text-lg 800px:text-[30px] font-Poppins text-start mb-4 font-[500] text-black  pb-2">
        Enrolled Courses
      </h1>
      <div className="w-full grid grid-cols-3 gap-2">
        {data &&
          data.map((item: any, index: number) => (
            <CourseCard index={index} course={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;