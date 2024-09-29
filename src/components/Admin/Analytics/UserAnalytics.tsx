import React, { useEffect, useMemo } from "react";
import { useGetUsersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
  onUserCountChange?: (count: number) => void; // Callback to pass the total user count
};

const UserAnalytics = ({ isDashboard, onUserCountChange }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery("admin", {});
  const analyticsData = data && [...data].reverse();

  // Calculate total user count
  const totalUserCount = useMemo(() => {
    return data ? data.reduce((sum: number, record: any) => sum + record.count, 0) : 0;
  }, [data]);

  // Pass the total count to the parent component
  useEffect(() => {
    if (onUserCountChange) {
      onUserCountChange(totalUserCount);
    }
  }, [totalUserCount, onUserCountChange]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"}`}>
          <div className={`${isDashboard && "!ml-8 mb-5"}`}>
            <Link href={"/instructor/user-analytics"} style={{ color: "black" }} className={`${styles.title} ${isDashboard && "text-sm  px-5 !text-start"}`}>
              User Analytics
            </Link>
          </div>
          <div className={`w-full ${isDashboard ? "h-[30vh]" : "h-screen"}  flex items-center justify-center`}>
            <ResponsiveContainer height={!isDashboard ? "50%" : "100%"} width={isDashboard ? "100%" : "90%"} className={"text-sm"}>
              <AreaChart
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                data={analyticsData}
              >
                <XAxis dataKey={"month"} />
                <YAxis />
                <Tooltip />
                <Area type={"monotone"} dataKey={"count"} stroke="#4d62d9" fill="#4d62d9" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
