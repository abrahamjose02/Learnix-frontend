import { styles } from "../../../styles/style";
import { Link2Icon, PencilIcon, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { toast } from "sonner";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: React.FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData?.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddclick = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.subtitleUrl === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        subtitleUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].subtitleUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].title[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        subtitleUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section  ${activeSection + 1}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].subtitleUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].title[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };
  return (
    <div className="m-auto mt-12 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <div key={index}>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[16px] px-2${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-[60%]"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none `}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]; 
                          updatedData[index] = {
                            ...updatedData[index], 
                            videoSection: e.target.value, 
                          };
                          setCourseContentData(updatedData); 
                        }}
                        
                      />
                      <PencilIcon
                        className="cursor-pointer dark:text-white text-black"
                        size={18}
                      />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  {/* Arrow button */}

                  <div className="flex items-center ">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={`${styles.label}`}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan.."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {...updatedData[index], title: e.target.value}

                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={`${styles.label}`}>Video Url</label>
                      <input
                        type="text"
                        placeholder="url"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {...updatedData[index], videoUrl: e.target.value}

                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={`${styles.label}`}>Subtitle Url</label>
                      <input
                        type="text"
                        placeholder="Subtitle Url..."
                        className={`${styles.input}`}
                        value={item.subtitleUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {...updatedData[index], subtitleUrl: e.target.value}

                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={`${styles.label}`}>
                        Video Description
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="description.."
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {...updatedData[index], description: e.target.value}
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() => {
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex);
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source code.. (link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index] = {
                              ...updatedData[index],
                              links: [...updatedData[index].links] // Make a copy of links array
                            };
                            updatedData[index].links[linkIndex] = {
                              ...updatedData[index].links[linkIndex], // Make a copy of link object
                              title: e.target.value
                            };
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Source code url.. (link url)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index] = {
                              ...updatedData[index],
                              links: [...updatedData[index].links] // Make a copy of links array
                            };
                            updatedData[index].links[linkIndex] = {
                              ...updatedData[index].links[linkIndex], // Make a copy of link object
                              url: e.target.value
                            };
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[14px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddclick(index)}
                      >
                        <Link2Icon className="mr-1" /> Add link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[14px] dark:text-white text-black cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <PlusCircle className="mr-2" size={20} /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[16px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" size={30} />
          Add New Section
        </div>
      </form>
      <br />
      <br />
      <div className="w-full flex items-center justify-between gap-2">
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded cursor-pointer  pt-2"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded pt-2 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;