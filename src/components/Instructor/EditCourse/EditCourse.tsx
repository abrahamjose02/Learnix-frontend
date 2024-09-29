"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "../CreateCourse/CourseInformation";
import CourseOptions from "../CreateCourse/CourseOptions";
import CourseData from "../CreateCourse/CourseData";
import CourseContent from "../CreateCourse/CourseContent";
import CoursePreview from "../CreateCourse/CoursePreview";
import {
  useGetCoursesQuery,
  useUpdateCourseMutation,
} from "../../../../redux/features/courses/coursesApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

interface CourseData {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  thumbnail: File;
  level: string;
  demoUrl: string;
  subtitleUrl: string;
  totalVideos: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  courseContentData: {
    videoUrl: string;
    subtitleUrl: string;
    title: string;
    description: string;
    videoSection: string;
    links: any[];
    suggestion: string;
  }[];
}

const EditCourse: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const {
    isLoading: getCourseLoading,
    data,
    refetch,
  } = useGetCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const editCourseData = data && data.find((i: any) => i._id === id);
  console.log(editCourseData);
  const [updateCourse, { isSuccess, error, isLoading }] =
    useUpdateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated Successfully");
      router.push("/instructor/courses");
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message.details);
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    subtitleUrl: "",
    category: "",
    thumbnail: "",
    thumbnailFile: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      subtitleUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        subtitleUrl: editCourseData.subtitleUrl,
        category: editCourseData?.category || "",
        thumbnail: editCourseData?.thumbnail,
        thumbnailFile: "",
      });
      setBenefits(editCourseData?.benefits);
      setPrerequisites(editCourseData?.prerequisites);
      setCourseContentData(editCourseData?.courseContentData);
    }
  }, [editCourseData]);

  const [courseData, setCourseData] = useState({});
  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefits) => ({
      title: benefits.title,
    }));
    const formattedprerequisites = prerequisites.map((prerequisites) => ({
      title: prerequisites.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        subtitleUrl: courseContent.subtitleUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnailFile,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      subtitleUrl: courseInfo.subtitleUrl,
      category: courseInfo.category,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedprerequisites,
      courseContentData: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data: any = courseData;
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("estimatedPrice", data.estimatedPrice);
    formData.append("tags", data.tags);
    formData.append("level", data.level);
    formData.append("demoUrl", data.demoUrl);
    formData.append("subtitleUrl", data.subtitleUrl);
    formData.append("category", data.category);
    formData.append("totalVideos", data.totalVideos);
    formData.append("benefits", JSON.stringify(data.benefits));
    formData.append("prerequisites", JSON.stringify(data.prerequisites));
    formData.append(
      "courseContentData",
      JSON.stringify(data.courseContentData)
    );
    formData.append("thumbnail", data.thumbnail);
    formData.append("courseId", editCourseData._id);
    formData.append("thumbnailUrl", editCourseData.thumbnail);
    await updateCourse(formData);
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%] ">
        <h5 className="mt-12 text-xl uppercase font-bold tracking-wide">
          Edit Course
        </h5>

        {active === 0 && (
          <CourseInformation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisities={prerequisites}
            setPrerequisities={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 800px:mr-0 -mr-10">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
