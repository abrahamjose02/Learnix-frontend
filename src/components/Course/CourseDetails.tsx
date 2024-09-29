"use client";
import { styles } from "../../styles/style";
import Ratings from "../../utils/Ratings";
import VideoPlayer from "../../utils/VideoPlayer";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CourseContentList from "../../components/Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { formatDate } from "../../utils/FormatDate";
import Image from "next/image";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen: (open: boolean) => void;
};

const CourseDetails: React.FC<Props> = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModel,
}) => {
  const [open, setOpen] = useState(false);
  const { data: userData, refetch } = useLoadUserQuery(undefined, {refetchOnMountOrArgChange: true});
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentage = (
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) *
    100
  ).toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item.courseId === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModel(true);
      refetch()
    }
  };
  return (
    <div className="bg-gray-50 ">
      <div className="px-[12%] m-auto py-8">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[24px] font-Poppins font-[600] text-black ">
              {data?.name}
            </h1>
            <div className="flex items-center gap-2 pt-1 text-sm mb-1">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-black ">
                  {data?.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black ">
                {data?.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-xl font-Poppins font-[500] text-black pb-2">
              What will you learn from this course?
            </h1>
            {data?.benefits?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-1" key={index}>
                <div className="w-[15px] mr-1">
                  <CheckIcon className="h-5 w-5 text-black " />
                </div>
                <p className="pl-2 text-black  text-sm">
                  {item.title}
                </p>
              </div>
            ))}
            <br />
            <h1 className="text-[25px] font-Poppins font-[500] text-black  text-xl pb-2">
              What are the prerequisites for starting this course?
            </h1>
            {data?.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-1" key={index}>
                <div className="w-[15px] mr-1">
                  <CheckIcon className="h-5 w-5 text-black " />
                </div>
                <p className="pl-2 text-black  text-sm">
                  {item.title}
                </p>
              </div>
            ))}
            <br />

            <h1 className="text-xl font-Poppins font-[500] text-black">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseContentData} isDemo={true} />
            <br />
            <div className=" text-sm 800px:w-[80%] whitespace-pre-line text-black">
              <h1 className="text-xl font-Poppins font-[500] pb-2 text-black">
                Course Details
              </h1>
              {data?.description}
            </div>
            <br />

            <div className="w-full text-black">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-md font-Poppins text-black ">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating : {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full flex  my-5  " key={index}>
                    <Image
                      src={
                        item?.user?.avatar
                          ? item.user.avatar
                          : "/assets/user.png"
                      }
                      alt="usericon"
                      width={30}
                      height={30}
                      className="rounded-full ml-5 w-[30px] h-[30px]"
                    />
                    <div className="pl-3 text-black">
                      <div className="flex gap-1">
                        <h5 className="text-xs font-sans ">
                          {item?.user.name}
                        </h5>{" "}
                        <small className="text-xs text-gray-600">
                          {item.createdAt && formatDate(item?.createdAt)}
                        </small>
                      </div>
                      <Ratings rating={item.rating} />
                      <p className="text-sm">{item?.comment}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full text-black">
              <VideoPlayerMemo
                videoUrl={data?.demoUrl}
                subtitleUrl={data?.subtitleUrl}
              />
              <div className="flex items-center">
                <h1 className="pt-5 text-[21px] font-bold">
                  {data?.price === 0 ? "Free" : <>&#x20b9; {data?.price}</>}
                </h1>
                <h5 className="pl-2 text-[16px] pt-6 line-through opacity-80 text-gray-700">
                  &#x20b9; {data?.estimatedPrice}
                </h5>
                <h4 className="pl-2 pt-5 text-[20px] font-semibold">
                  <span className="text-green-500">{discountPercentage}% </span>
                  off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} 800px:!text-sm !text-xs text-white font-thin !w-[60%] mt-2 mb-4 !py-2`}
                    href={`/course-access/${data?._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} 800px:!text-sm !text-xs text-white font-thin !w-[30%] mt-2 mb-4 !py-2`}
                    onClick={handleOrder}
                  >
                    Buy Now
                  </div>
                )}
              </div>
              <p className="pb-1 text-sm">* Source code included</p>
              <p className="pb-1 text-sm ">* Full life time access</p>
              <p className="pb-1 text-sm">* Certificates of Completion</p>
              <p className="pb-3 800px:pb-6 text-sm">* Premium Support</p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[400px] min-h-[400px] bg-white rounded-md shadow p-3">
              <div className="w-full flex justify-end">
                <XMarkIcon
                  className="h-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full px-2">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} refetch={refetch} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

const VideoPlayerMemo = React.memo(VideoPlayer, (prevProps, nextProps) => {
  return prevProps.videoUrl === nextProps.videoUrl;
});

export default CourseDetails;