"use client";
import React, { useEffect } from "react";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import CourseContent from "../../../components/Course/CourseContent";
import Loader from "../../../components/ui/Loader/Loader";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item.courseId === id,
      );
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default Page;