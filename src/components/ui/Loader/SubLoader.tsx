import React from "react";

type Props = {};

const SubLoader = (props: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <div
        className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
        style={{ animationDelay: "-0.5s", animationDuration: ".5s" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
        style={{ animationDelay: "-0.25s", animationDuration: ".5s" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: ".5s" }}
      ></div>
    </div>
  );
};

export default SubLoader;
