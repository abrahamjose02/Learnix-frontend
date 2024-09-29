"use-client";
import React, { useEffect, useState } from "react";
import {
  useAddFAQMutation,
  useGetFAQQuery,
} from "../../../../redux/features/admin/adminApi";
import { styles } from "../../../styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";

type Props = {};

const EditFAQ = (props: Props) => {
  const { data, isLoading } = useGetFAQQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [questions, setQuestions] = useState<any[]>([]);

  const [addFAQ, { isLoading: addFAQLoading, error, isSuccess }] =
    useAddFAQMutation();

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: new Date().getTime().toString(),
        question: "",
        answer: "",
      },
    ]);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const handleEdit = async () => {
    const newData = questions.map(({ _id, active, ...rest }: any) => rest);
    await addFAQ(newData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("FAQ updated successfully");
    }
  }, [isSuccess]);

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
      <div className="mt-12 bg-white dark:bg-gray-800 shadow-sm p-4 rounded-md">
        <dl className="space-y-8">
          {questions.map((q: any) => (
            <div
              key={q._id}
              className={`${
                q._id !== questions[0]?._id && "border-t"
              } border-gray-200 dark:border-gray-600 pt-6 bg-gray-50 dark:bg-gray-700 p-2`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <input
                    className={`${styles.input} border-none bg-transparent dark:text-white`}
                    value={q.question}
                    onChange={(e: any) =>
                      handleQuestionChange(q._id, e.target.value)
                    }
                    placeholder="Add your question.."
                  />
                  <span className="ml-6 flex-shrink-0">
                    {q.active ? (
                      <HiMinus className="h-6 w-6 dark:text-white text-black" />
                    ) : (
                      <HiPlus className="h-6 w-6 dark:text-white text-black" />
                    )}
                  </span>
                </button>
              </dt>
              {q.active && (
                <dd className="mt-2 pr-12 flex">
                  <input
                    className={`${styles.input} border-none bg-transparent dark:text-white`}
                    value={q.answer}
                    onChange={(e: any) =>
                      handleAnswerChange(q._id, e.target.value)
                    }
                    placeholder="Add your answer."
                  />
                  <span className="ml-2 flex items-center">
                    <AiOutlineDelete
                      className="dark:text-white text-black text-sm cursor-pointer h-5 w-5"
                      onClick={() => {
                        setQuestions((prevQuestion) =>
                          prevQuestion.filter((item) => item._id !== q._id)
                        );
                      }}
                    />
                  </span>
                </dd>
              )}
            </div>
          ))}
        </dl>
        <br />
        <IoMdAddCircleOutline
          className="dark:text-white text-black text-lg cursor-pointer h-7 w-7"
          onClick={newFaqHandler}
        />
      </div>
      <div
        className={`${
          styles.button
        } !w-[100px] !min-h-[35px] !h-[35px] text-white font-thin bg-[#cccccc34] dark:bg-gray-600 mt-4 !text-sm justify-end items-center float-right
        ${
          areQuestionsUnchanged(data, questions) ||
          isAnyQuestionEmpty(questions)
            ? "!cursor-not-allowed"
            : "!cursor-pointer"
        }`}
        onClick={
          areQuestionsUnchanged(data, questions) ||
          isAnyQuestionEmpty(questions)
            ? () => null
            : handleEdit
        }
      >
        Save
      </div>
    </div>
  );
};

export default EditFAQ;
