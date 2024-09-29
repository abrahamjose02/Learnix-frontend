"use client";
import React from "react";
import CourseDetails from "../../../components/Course/CourseDetailsPage";

type Props = {};

const page = ({ params }: any) => {
  return (
    <div>
      <CourseDetails id={params.id} />
    </div>
  );
};

export default page;