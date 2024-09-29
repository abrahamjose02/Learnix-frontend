import React, { useMemo } from "react";
import { useGetCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
  onOrderCountChange?: (count: number) => void;
};

const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"];

const OrderAnalyticsInstructor = ({ isDashboard, onOrderCountChange }: Props) => {
  const { isLoading, data } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  let analyticsData =
    data &&
    [...data].map((course: any) => ({
      name: course.name,
      orders: course.purchased,
    }));

  // Calculate total order count
  const totalOrderCount = useMemo(() => {
    return data ? data.reduce((acc: number, course: any) => acc + course.purchased, 0) : 0;
  }, [data]);

  React.useEffect(() => {
    if (onOrderCountChange) {
      onOrderCountChange(totalOrderCount);
    }
  }, [totalOrderCount, onOrderCountChange]);

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
              href={"/instructor/order-course-analytics"}
              style={{ color: "black" }}
              className={`${styles.title} ${
                isDashboard && "text-sm px-5 !text-start "
              }`}
            >
              Order Analytics
            </Link>
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[50vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              height={"100%"}
              width={"90%"}
              className={"text-sm"}
            >
              <BarChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="orders"
                  fill="#82ca9d"
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalyticsInstructor;
