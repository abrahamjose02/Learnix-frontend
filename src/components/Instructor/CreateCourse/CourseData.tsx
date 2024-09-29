import { styles } from "../../../styles/style";
import React from "react";
import { MdAddCircle } from "react-icons/md";
import { toast } from "sonner";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisities: { title: string }[];
  setPrerequisities: (prerequisities: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: React.FC<Props> = ({
  benefits,
  setBenefits,
  prerequisities,
  setPrerequisities,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updateBenefits = [...benefits];
    updateBenefits[index].title = value;
    setBenefits(updateBenefits);
  };
  const handlePrequisitiesChange = (index: number, value: any) => {
    const updatePrerequisities = [...prerequisities];
    updatePrerequisities[index].title = value;
    setPrerequisities(updatePrerequisities);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handleAddPrerequisities = () => {
    setPrerequisities([...prerequisities, {title: ""}])
  }
  const prevButton = () => {
    setActive(active - 1)
  }
  const handleOptions = () => {
    if(benefits[benefits.length - 1]?.title !== "" && prerequisities[prerequisities.length-1]?.title !== ""){
        setActive(active + 1)
    }else{
        toast.error("Please fill the fields for go to next!")
    }
  }
  return (
    <div className=" mx-auto mt-12 block">
      <div>
        <label className={`${styles.label} text-[18px]`}>
          what are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefits: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to learn complete MERN stack"
            required
            className={`${styles.input} my-2`}
            value={benefits.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <MdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefits}
        />
      </div>
      <br />
      <div>
        <label className={`${styles.label} text-[18px]`}>
          what are the prerequisities for students in this course?
        </label>
        <br />
        {prerequisities.map((prerequisities: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequisities"
            placeholder="You need basic knowledge of Javascript"
            required
            className={`${styles.input} my-2`}
            value={prerequisities.title}
            onChange={(e) => handlePrequisitiesChange(index, e.target.value)}
          />
        ))}
        <MdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisities}
        />
      </div>

      <div className='w-full flex items-center justify-between gap-2'>
            <div className="w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded cursor-pointer  pt-2"
            onClick={() => prevButton()}
            >
            Prev
            </div>
            <div className="w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded pt-2 cursor-pointer"
            onClick={() => handleOptions()}
            >
            Next
            </div>
        </div>
    </div>
  );
};

export default CourseData;