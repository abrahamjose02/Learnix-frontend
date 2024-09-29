export const styles = {
  title:
    " text-black dark:text-white font-[500] font-Poppins text-center py-2 ",
  label:
    "text-[16px] font-Poppins text-black dark:text-white text-sm uppercase tracking-wider mb-1",
  input:
    "w-full text-sm text-black dark:text-white bg-transparent border border-gray-400 bg-gray-200 rounded h-[40px] px-2 outline-none  font-Poppins ",
  button:
    "flex flex-row justify-center py-3 px-6 rounded cursor-pointer bg-gray-900 w-full 800px:text-sm text-xs font-Poppins font-semibold uppercase tracking-widest font-[200]",
};

export const subjects = [
  "Accounting",
  "Art",
  "Business",
  "Computer Science",
  "Economics",
  "Foreign Language",
  "Geography",
  "Graphic Design",
  "Health",
  "History",
  "Language Arts",
  "Mathematics",
  "Music",
  "Physical Education",
  "Programming",
  "Psychology",
  "Science",
  "Social Studies",
  "Sociology",
  "Web Development",
];

const currentYear = new Date().getFullYear();
const startYear = currentYear - 40;
const endYear = currentYear + 1;

export const years = Array.from(
  { length: endYear - startYear },
  (_, index) => startYear + index
);