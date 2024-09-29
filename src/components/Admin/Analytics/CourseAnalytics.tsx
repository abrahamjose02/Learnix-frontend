import React, { useEffect, useMemo } from "react";
import { useGetCourseAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, LabelList } from "recharts";
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
  onCourseCountChange?: (count: number) => void; // Callback to pass the total course count
};

const CourseAnalytics = ({ isDashboard, onCourseCountChange }: Props) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery("admin", {});
  const analyticsData = data && [...data].reverse();

  // Calculate total course count
  const totalCourseCount = useMemo(() => {
    return data ? data.reduce((sum: number, record: any) => sum + record.count, 0) : 0;
  }, [data]);

  // Pass the total count to the parent component
  useEffect(() => {
    if (onCourseCountChange) {
      onCourseCountChange(totalCourseCount);
    }
  }, [totalCourseCount, onCourseCountChange]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"}`}>
          <div className={`${isDashboard && "!ml-8 mb-5"}`}>
            <Link href={"/instructor/course-analytics"} style={{ color: "black" }} className={`${styles.title} ${isDashboard && "text-sm  px-5 !text-start"}`}>
              Course Analytics
            </Link>
          </div>
          <div className={`w-full ${isDashboard ? "h-[30vh]" : "h-screen"}  flex items-center justify-center`}>
            <ResponsiveContainer height={!isDashboard ? "50%" : "100%"} width={isDashboard ? "100%" : "90%"}>
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey={"month"} className="text-sm" />
                <YAxis className="text-sm" />
                <Bar dataKey="count" fill="#3faf82">
                  <LabelList dataKey={"count"} position={"top"} className="text-sm" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
