import React from "react";
import { styles } from "../../../styles/style";
import Ratings from "../../../utils/Ratings";
import { IoMdCheckmark } from "react-icons/io";
import VideoPlayer from "../../../utils/VideoPlayer";
import SubLoader from "../../../components/ui/Loader/SubLoader";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
  isLoading: boolean;
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
  isLoading
}) => {
  const prevButton = () => {
    setActive(active - 1);
  };

  const estimatedPrice = courseData?.estimatedPrice || 0;
  const price = courseData?.price || 0;

  const discount = ((estimatedPrice - price) / estimatedPrice) * 100;
  const discountPrice = discount.toFixed(0);
  return (
    <div className="m-auto mb-5 font-Poppins ">
      <div className="w-full relative">
        <div className="800px:w-[80%] mt-10">
          <VideoPlayer
            videoUrl={courseData?.demoUrl}
            subtitleUrl={courseData?.subtitleUrl}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] font-bold">
            {courseData?.price === 0 ? (
              "Free"
            ) : (
              <>&#x20b9; {courseData?.price}</>
            )}
          </h1>
          <h5 className="pl-2 text-[16px] pt-6 line-through opacity-80 text-gray-700">
            &#x20b9; {courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-2 pt-5 text-[20px] font-semibold">
            <span className="text-green-500">{discountPrice}% </span>off
          </h4>
        </div>

        {/* <div className="flex items-center !w-[45%] mb-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="coupon code"
            className={`${styles.input}`}
          />
          <div
            className={`${styles.button} !w-[20%] ml-2 text-white font-thin`}
          >
            Apply
          </div>
        </div> */}
        <p className="pb-1 text-sm">* Source code included</p>
        <p className="pb-1 text-sm ">* Full life time access</p>
        <p className="pb-1 text-sm">* Certificates of Completion</p>
        <p className="pb-3 800px:pb-6 text-sm">* Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[24px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center gap-2 pt-1 text-sm">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 students</h5>
          </div>
          <br />
          <h1 className="text-xl font-Poppins font-[600]">
            what you will learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoMdCheckmark size={20} />
            </div>
            <p className="pl-2 text-sm">{item.title}</p>
          </div>
        ))}
        <br />
        <h1 className="text-xl font-Poppins font-[600]">
          what are the prequisites for starting this course?
        </h1>

        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoMdCheckmark size={20} />
            </div>
            <p className="pl-2 text-sm">{item.title}</p>
          </div>
        ))}
        <br />
        <div className=" text-sm 800px:w-[60%]">
          <h1 className="text-xl font-Poppins font-[600] pb-2">
            Course Details
          </h1>
          {courseData?.description}
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded cursor-pointer  pt-2"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="1100px:mr-16  w-full 800px:w-[180px] min-h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded  cursor-pointer items-center flex justify-center"
          onClick={() => handleCourseCreate()}
        >
          {isLoading ? <SubLoader /> : isEdit ? "Update" : "Create"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;