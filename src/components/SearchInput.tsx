import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchCourseMutation } from "../../redux/features/courses/coursesApi";
import { useRouter } from "next/navigation";
type Props = {};

const SearchInput = (props: Props) => {
  const [searchCourse, { isSuccess, error }] = useSearchCourseMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [debounced] = useDebounce(keyword, 1000);
  const router = useRouter();

  useEffect(() => {
    if (!debounced) {
      setIsLoading(false);
      setCourses([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setIsLoading(true);
    const fetchCourses = async () => {
      try {
        const data: any = await searchCourse({ keyword: debounced, signal });
        setCourses(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      }
    };

    fetchCourses();

    return () => {
      controller.abort();
    };
  }, [debounced, searchCourse]);

  const handleSearch = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="1100px:block hidden">
      <label
        className=" mx-auto 1300px:w-[28rem] min-w-md  flex flex-col md:flex-row items-center justify-center  border py-1 px-2 rounded-md gap-2 shadow-sm focus-within:border-gray-300"
        htmlFor="search-bar"
      >
        <input
          id="search-bar"
          placeholder=" Search courses.."
          className="px-6 py-2 w-full rounded-md flex-1 outline-none text-sm bg-transparent text-blue-gray-900"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setIsLoading(false);
          }}
        />
        <button
          className="w-full md:w-auto px-3  py-2 bg-black  text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-md transition-all disabled:opacity-70"
          onClick={handleSearch}
          disabled={isLoading}
        >
          <div className="relative">
            {isLoading && (
              <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg
                  className="animate-spin w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            <div className="flex items-center transition-all opacity-1 ">
              <span className="text-xs font-thin  tracking-wide whitespace-nowrap truncate mx-auto">
                {isLoading ? "Searching..." : "Search"}
              </span>
            </div>
          </div>
        </button>
      </label>

      {courses?.length !== 0 && (
        <ul
          role="menu"
          data-popover="notifications-menu"
          data-popover-placement="bottom"
          className="absolute z-10 flex flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm text-blue-gray-500 shadow-lg focus:outline-none mt-4"
        >
          {courses.map((item: any, index: number) => (
            <li
              key={index}
              onClick={() => router.push(`/course/${item._id}`)}
              className="flex items-center gap-4 px-3 py-2 leading-tight transition-all rounded-md outline-none cursor-pointer select-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <img
                alt="tania andrew"
                src={item.thumbnail}
                className="h-12 w-12 rounded-md object-cover object-center"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-normal text-gray-700">
                  {item.name}
                </p>
                <p className="flex items-center gap-1 font-medium max-w-xs truncate ">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;