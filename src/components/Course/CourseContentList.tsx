import React, { FC, useState } from "react";
import { HiOutlineChevronUp } from "react-icons/hi";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = Array.from(
    new Set<string>(props.data?.map((item: any) => item.videoSection))
  );

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[10px] bg-gray-200 px-4  py-3 800px:w-[80%] rounded-md ${
        !props.isDemo && "ml-[-30px] sticky top-24 left-0 z-30 "
      }`}
    >

      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount: number = sectionVideos.length;
        // const sectionVideoLength: number = sectionVideos.reduce(
        //   (totalLength: number, item: any) => totalLength + item.videoLength,
        //   0
        // );
        const sectionVideoLength: number = sectionVideoCount * 30;

        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours: number = sectionVideoLength / 60;
        return (
          <div
            className={`${
              props.isDemo && "border-b-2 border-[#ffffff] pb-2 "
            } cursor-pointer`}
            key={section}
            onClick={() => toggleSection(section)}
          >
            <div className="w-full flex">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-sm  text-black  !font-bold tracking-wide">
                  {section}
                </h2>
                <button
                  className="mr-4 cursor-pointer text-black "
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSection(section)}}
                >
                  {isSectionVisible ? (
                    <HiOutlineChevronUp className="h-8" />
                  ) : (
                    <HiOutlineChevronDown className="h-8" />
                  )}
                </button>
              </div>
            </div>
            <h5 className={`text-black  text-sm ${!isSectionVisible && "pb-3"} `}>
              {sectionVideoCount} Lessions .{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength >= 60 ? "hours" : "minutes"}
            </h5>

            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full mt-2 ml-2 ${
                        videoIndex === props.activeVideo
                          ? "bg-gray-800 px-3 "
                          : ""
                      } cursor-pointer transition-all p-1`}
                      key={item._id}
                      onClick={(e) =>{
                        e.stopPropagation()
                        props.isDemo ? null : props?.setActiveVideo(videoIndex)
                      }
                      }
                    >
                      <div className="flex  items-center">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-4"
                            color="#1cdada"
                          />
                        </div>
                        <div>
                          <h1
                            className={`text-sm inline-block break-words ${
                              videoIndex === props.activeVideo
                                ? "text-white"
                                : "text-black"
                            } `}
                          >
                            {item.title}
                          </h1>
                          <h5
                            className={`${
                              videoIndex === props.activeVideo
                                ? "text-white"
                                : "text-black"
                            }  text-xs ml-1`}
                          >
                            {item.videoLength > 60
                              ? contentLength.toFixed(2)
                              : item.videoLength
                              ? item.videoLength
                              : "30"}{" "}
                            {item.videoLength >= 60 ? "hours" : "minutes"}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      
    </div>
  );
};

export default CourseContentList;