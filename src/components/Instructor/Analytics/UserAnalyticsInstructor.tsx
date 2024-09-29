import React, { useMemo } from "react";
import { useGetCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
  onUserCountChange?: (count: number) => void;
};

const COLORS = ["#4d62d9", "#82ca9d", "#ffc658"];

const UserAnalyticsInstructor = ({ isDashboard, onUserCountChange }: Props) => {
  const { isLoading, data } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  let analyticsData =
    data &&
    [...data].map((course: any) => ({
      name: course.name,
      value: course.purchased,
    }));

  // Calculate total user count
  const totalUserCount = useMemo(() => {
    return data ? data.reduce((acc: number, course: any) => acc + course.purchased, 0) : 0;
  }, [data]);

  React.useEffect(() => {
    if (onUserCountChange) {
      onUserCountChange(totalUserCount);
    }
  }, [totalUserCount, onUserCountChange]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard && "!ml-8 mb-5"}`}>
            <Link
              href={"/instructor/user-course-analytics"}
              style={{ color: "black" }}
              className={`${styles.title} ${
                isDashboard && "text-sm px-5 !text-start "
              }`}
            >
              User-Course-Analytics
            </Link>
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              height={!isDashboard ? "50%" : "100%"}
              width={isDashboard ? "100%" : "90%"}
              className={"text-sm"}
            >
              <PieChart>
                <Pie
                  data={analyticsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={60}
                  fill="#8884d8"
                  label
                >
                  {analyticsData &&
                    analyticsData.map((_: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalyticsInstructor;
