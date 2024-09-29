"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  useGetAllCoursesQuery,
} from "../../../redux/features/courses/coursesApi";
import Loader from "../../components/ui/Loader/Loader";
import Header from "../../components/Header";
import Heading from "../../utils/Heading";
import { styles } from "../../styles/style";
import { CourseCard } from "../../components/ui/Carousel/Carousel";
import CategoryCarousel from "../../components/ui/Carousel/CategoryCarousel";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data);
    } else {
      setCourses(data?.filter((item: any) => item.category === category));
    }
    if (search) {
      setCourses(
        data?.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [data, category, search]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={` All Courses | Learnix`}
            description=""
            keywords=""
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <div className="min-h-screen mx-auto 800px:px-[12%] bg-gray-50 -mt-24">
            <div className="  items-center flex-wrap pt-24">
              <CategoryCarousel category={category} setCategory={setCategory} />
            </div>
            <br />
            <br />

            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No course found"
                  : "No course found in this category. please try another one!"}
              </p>
            )}
            <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 px-[5%] 800px:px-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard index={index} course={item} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;