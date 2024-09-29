import { styles } from "../../styles/style";
import VideoPlayer from "../../utils/VideoPlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { toast } from "sonner";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewMutation,
  useEditReviewMutation,
  useGetCourseDetailsQuery,
} from "../../../redux/features/courses/coursesApi";
import { formatDate } from "../../utils/FormatDate";
import { MdMessage, MdVerifiedUser } from "react-icons/md";
import Ratings from "../../utils/Ratings";
import socketIO from "socket.io-client";
const EndPoint = "https://app.learnixelearn.shop";
const socketId = socketIO(EndPoint, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [editReviewData, setEditReviewData] = useState({
    rating: 1,
    comment: "",
  }); // Store the current review being edited
  const [addQuestion, { isSuccess, error, isLoading: addQuestionLoading }] =
    useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: addAnswerLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const [
    addReview,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const [
    editReview,
    {
      isSuccess: editReviewSuccess,
      error: editReviewError,
      isLoading: editReviewLoading,
    },
  ] = useEditReviewMutation();

  const course = courseData;
  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      const questionList = {
        user: {
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          instructorId: course.instructorId,
          courseName: course.name,
        },
        question,
        questionReplies: [],
      };

      addQuestion({
        questionList,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    const answerList = {
      user: {
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
      answer,
      createdAt: Date.now(),
    };
    addAnswerInQuestion({
      answerList,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      const reviewList = {
        user: {
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        },
        rating,
        comment: review,
        commentReplies: [],
      };
      addReview({ reviewList, courseId: id });
    }
  };

  // Handler to open edit form and pre-fill data
  const handleEditReview = (review: { rating: any; comment: any }) => {
    setIsEditing(true);
    setEditReviewData({
      rating: review.rating,
      comment: review.comment,
    });
  };

  // Handler to submit the edited review
  const handleEditReviewSubmit = () => {
    if (editReviewData.comment.length === 0) {
      toast.error("Review can't be empty");
    } else {
      const editedReview = {
        ...editReviewData,
        user: {
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        },
      };

      editReview({
        reviewId: isReviewExists._id,
        updatedReview: editedReview,
        courseId: id,
      });
    }
  };

  useEffect(() => {
    if (editReviewSuccess) {
      courseRefetch();
      toast.success("Review edited successfully");
      setIsEditing(false); // Close edit form
    }

    if (editReviewError) {
      if ("data" in editReviewError) {
        const errorMessage = editReviewError as any;
        console.log(errorMessage);
        // toast.error(errorMessage.data.message);
      }
    }
  }, [editReviewSuccess, editReviewError]);

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification", {
        title: "New Question",
        instructorId: course.instructorId,
      });
    }

    if (answerSuccess) {
      refetch();
      toast.success("Answer added successfully");
      setAnswer("");
    }

    if (reviewSuccess) {
      courseRefetch();
      toast.success("Review added successfully");
      setReview("");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        console.log(errorMessage);
        // toast.error(errorMessage.message);
      }
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        console.log(errorMessage);

        // toast.error(errorMessage.data.message);
      }
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        console.log(errorMessage);

        // toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    answerSuccess,
    reviewSuccess,
    error,
    answerError,
    reviewError,
  ]);

  return (
    <div className="m-auto w-[95%] py-4 800px:w-[86%]">
      <VideoPlayerMemo
        subtitleUrl={data[activeVideo]?.subtitleUrl}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="my-3 flex w-full items-center justify-between">
        <div
          className={`${
            styles.button
          } !min-h-[35px] !w-[unset] items-center !py-[unset] !text-xs font-thin text-white ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev
        </div>

        <div
          className={`${
            styles.button
          } !min-h-[35px] !w-[unset] items-center !py-[unset] !text-xs font-thin text-white ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-xl font-[600]">{data[activeVideo]?.title}</h1>
      <br />
      <div className="flex w-full items-center  justify-between rounded bg-gray-500 bg-opacity-20 p-2 px-4 shadow-inner shadow-[bg-gray-700] backdrop-blur">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`cursor-pointer 800px:text-sm ${
              activeBar === index ? "font-[600] text-red-500" : "text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <div className="bg-gray-100 px-4 py-4 text-black">
        {activeBar === 0 && (
          <p className="mb-3 whitespace-pre-line text-sm">
            {data[activeVideo]?.description}
          </p>
        )}
        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div className="mb-5" key={index}>
                <h2 className="800px:inline-block 800px:text-sm ">
                  {item.title && item.title + " : "}
                </h2>{" "}
                <a
                  className="800px:pl2 inline-block text-[#4395c4] 800px:text-sm"
                  href={item.url}
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}
        {activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image
                src={user?.avatar ? user.avatar : "/assets/user.png"}
                alt="usericon"
                width={30}
                height={30}
                className="ml-5 h-[30px] w-[30px] rounded-full"
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="write your questions.."
                className="ml-3 w-[90%] rounded border !border-black bg-transparent p-2 font-Poppins outline-none 800px:w-full 800px:text-sm"
              ></textarea>
            </div>
            <div className="flex w-full justify-end">
              <div
                className={`${
                  styles.button
                } mt-3 !h-[30px] !w-[100px] items-center !text-xs font-thin text-white
                ${addQuestionLoading && "cursor-not-allowed"}
                `}
                onClick={addQuestionLoading ? () => {} : handleQuestion}
              >
                Submit
              </div>
            </div>
            <br />
            <div className="h-[1px] w-full bg-[#ffffff3b] "></div>
            <div>
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setQuestionId={setQuestionId}
                addAnswerLoading={addAnswerLoading}
              />
            </div>
          </>
        )}
        {activeBar === 3 && (
          <div className="w-full">
            <>
              {!isReviewExists && (
                <>
                  <div className="flex w-full">
                    <Image
                      src={user?.avatar ? user.avatar : "/assets/user.png"}
                      alt="usericon"
                      width={30}
                      height={30}
                      className="ml-5 h-[30px] w-[30px] rounded-full"
                    />
                    <div className="w-full">
                      <h5 className="pl-3 text-sm font-[500] ">
                        Give a Rating <span className="text-red-500">*</span>
                      </h5>
                      <div className="ml-2 flex w-full pb-3 ">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="write your comment.."
                        className="w-[90%] rounded border !border-black bg-transparent p-2 font-Poppins outline-none 800px:w-full 800px:text-sm"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex w-full justify-end">
                    <div
                      className={`${
                        styles.button
                      } mt-1 !h-[30px] !w-[100px] items-center !text-xs font-thin text-white ${
                        reviewCreationLoading && "cursor-no-drop"
                      }`}
                      onClick={
                        reviewCreationLoading ? () => {} : handleReviewSubmit
                      }
                    >
                      Submit
                    </div>
                  </div>
                </>
              )}
            </>
            <br />
            <div className="h-[1px] w-full bg-[#ffffff3b]"></div>

            {/* Render Reviews */}
            <div className="w-full">
              {course?.reviews?.map((item: any, index: number) => (
                <div className="my-5 flex w-full" key={index}>
                  <Image
                    src={
                      item?.user?.avatar ? item.user.avatar : "/assets/user.png"
                    }
                    alt="usericon"
                    width={30}
                    height={30}
                    className="ml-5 h-[30px] w-[30px] rounded-full"
                  />
                  <div className="pl-3">
                    <div className="flex gap-1">
                      <h5 className="font-sans text-xs">{item?.user.name}</h5>
                      <small className="text-xs text-gray-600">
                        {item.createdAt && formatDate(item?.createdAt)}
                      </small>
                    </div>
                    <Ratings rating={item.rating} />
                    <p className="text-sm">{item?.comment}</p>

                    {/* Edit Button for Review Owner */}
                    {item.user._id === user?._id && (
                      <div className="flex gap-2">
                        <button
                          className="text-xs text-blue-500"
                          onClick={() => handleEditReview(item)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Render Edit Form Conditionally */}
            {isEditing && (
              <div className="w-full">
                <div className="flex w-full">
                  <Image
                    src={user?.avatar ? user.avatar : "/assets/user.png"}
                    alt="usericon"
                    width={30}
                    height={30}
                    className="ml-5 h-[30px] w-[30px] rounded-full"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-sm font-[500]">
                      Edit Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="ml-2 flex w-full pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        editReviewData.rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() =>
                              setEditReviewData({
                                ...editReviewData,
                                rating: i,
                              })
                            }
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() =>
                              setEditReviewData({
                                ...editReviewData,
                                rating: i,
                              })
                            }
                          />
                        )
                      )}
                    </div>
                    <textarea
                      value={editReviewData.comment}
                      onChange={(e) =>
                        setEditReviewData({
                          ...editReviewData,
                          comment: e.target.value,
                        })
                      }
                      cols={40}
                      rows={5}
                      placeholder="Edit your comment.."
                      className="w-[90%] rounded border !border-black bg-transparent p-2 font-Poppins outline-none 800px:w-full 800px:text-sm"
                    ></textarea>
                  </div>
                </div>
                <div className="flex w-full justify-end">
                  <div
                    className={`${
                      styles.button
                    } mt-1 !h-[30px] !w-[100px] items-center !text-xs font-thin text-white ${
                      editReviewLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      editReviewLoading ? () => {} : handleEditReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const VideoPlayerMemo = React.memo(VideoPlayer, (prevProps, nextProps) => {
  return prevProps.videoUrl === nextProps.videoUrl;
});

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  addAnswerLoading,
}: any) => {
  return (
    <>
      <div className="my-3 w-full">
        {data[activeVideo]?.questions?.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            addAnswerLoading={addAnswerLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  setQuestionId,
  item,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
  addAnswerLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="mb-2 flex">
          <Image
            src={item.user?.avatar ? item.user.avatar : "/assets/user.png"}
            alt="usericon"
            width={30}
            height={30}
            className="ml-5 h-[30px] w-[30px] rounded-full"
          />

          <div className="pl-3 ">
            <div className="flex gap-1">
              <h5 className="font-sans text-xs ">{item?.user.name}</h5>
              <small className="text-xs text-gray-600">
                {item.createdAt && formatDate(item?.createdAt)}
              </small>
            </div>
            <p className="text-sm">{item?.question}</p>
          </div>
        </div>

        <div className="flex w-full">
          <span
            className="mr-2 cursor-pointer  text-xs text-gray-700 800px:pl-16"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item?.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <MdMessage className="cursor-pointer text-gray-700 " />
          <span className="cursor-pointer pl-1 text-xs  text-gray-700">
            {item?.questionReplies?.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item?.questionReplies.map((item: any, index: number) => (
              <div className="my-5 flex w-full 800px:ml-16  " key={index}>
                <Image
                  src={
                    item?.user?.avatar ? item.user.avatar : "/assets/user.png"
                  }
                  alt="usericon"
                  width={30}
                  height={30}
                  className="ml-5 h-[30px] w-[30px] rounded-full"
                />
                <div className="pl-3 ">
                  <div className="flex gap-1">
                    <h5 className="font-sans text-xs ">{item?.user.name}</h5>{" "}
                    {item.user.role === "instructor" && (
                      <MdVerifiedUser className="text-[#369eff]" />
                    )}
                    <small className="text-xs text-gray-600">
                      {item.createdAt && formatDate(item?.createdAt)}
                    </small>
                  </div>
                  <p className="text-sm">{item?.answer}</p>
                </div>
              </div>
            ))}
            <>
              <div className="relative mt-2 flex w-full px-2 text-sm ">
                <input
                  type="text"
                  placeholder="Enter your answer.."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block w-[95%] border-b border-gray-700 bg-transparent p-[5px] outline-none placeholder:text-gray-600 800px:ml-12 ${
                    answer === "" || (addAnswerLoading && "cursor-no-drop")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute bottom-1 right-4 text-xs !font-thin uppercase"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || addAnswerLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;





