import React, { useEffect, useMemo } from "react";
import { useGetOrdersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";
import { LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, CartesianGrid, Legend } from "recharts";
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
  onOrderCountChange?: (count: number) => void; // Callback to pass the total order count
};

const OrderAnalytics = ({ isDashboard, onOrderCountChange }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery("admin", {});
  const analyticsData = data && [...data].reverse();

  // Calculate total order count
  const totalOrderCount = useMemo(() => {
    return data ? data.reduce((sum: number, record: any) => sum + record.count, 0) : 0;
  }, [data]);

  // Pass the total count to the parent component
  useEffect(() => {
    if (onOrderCountChange) {
      onOrderCountChange(totalOrderCount);
    }
  }, [totalOrderCount, onOrderCountChange]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? "h-[30vh]" : "h-screen"}`}>
          <div className={`${isDashboard ? "mt-[50px] pl-[40px] mb-2" : "mt-[50px]"}`}>
            <Link href={"/instructor/order-analytics"} style={{ color: "black" }} className={`${styles.title} ${isDashboard && "text-sm  px-5 !text-start"}`}>
              Order Analytics
            </Link>
          </div>
          <div className={`w-full ${!isDashboard ? "h-[90%]" : "h-full"}  flex items-center justify-center`}>
            <ResponsiveContainer height={isDashboard ? "100%" : "50%"} width={isDashboard ? "100%" : "90%"} className={"text-sm"}>
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"month"} />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type={"monotone"} dataKey={"count"} stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
