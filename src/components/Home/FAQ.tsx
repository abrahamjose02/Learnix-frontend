import React, { useState } from "react";
import { useGetFAQQuery } from "../../../redux/features/admin/adminApi";

const AccordionItem: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li className="my-2 bg-white text-black p-2 px-4 shadow-lg">
      <h5
        onClick={handleToggle}
        className="flex cursor-pointer flex-row items-center justify-between p-3 font-semibold"
      >
        <span className="800px:text-sm text-xs ">{title}</span>
        <svg
          className={`h-6 w-6 transform fill-current text-yellow-700 transition-transform duration-500  ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
        </svg>
      </h5>
      <div
        className={`transition-height overflow-hidden border-l-2 border-yellow-600 duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <p className="p-3 text-gray-900 800px:text-sm text-xs">{content}</p>
      </div>
    </li>
  );
};

const FAQ: React.FC = () => {
  const { data } = useGetFAQQuery({});
  return (
    <main className="bg-white text-black p-5 font-Poppins ">
      <div className="my-2 flex items-start justify-center">
        <div className="my-1 w-full sm:w-10/12 md:w-1/2">
          <h1 className="mb-10 text-center text-lg font-[1000] 800px:text-4xl">
            Frequently Asked Questions
          </h1>

          <ul className="flex flex-col gap-4">
            {data &&
              data.map((item: any, index: number) => (
                <AccordionItem title={item.question} content={item.answer} key={index} />
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default FAQ;