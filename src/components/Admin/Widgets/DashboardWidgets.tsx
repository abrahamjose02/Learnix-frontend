import React, { useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { ScaleIcon, UsersIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import CourseAnalytics from "../Analytics/CourseAnalytics";
import RevenuePerOrder from "../Analytics/RevenueAnalytics"; // Import the RevenuePerOrder component

type Props = {
  open: boolean;
};

const DashboardWidgets = (props: Props) => {
  // State to store total counts for users, orders, courses, and revenue
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  return (
    <div>
      <div className="grid-cols-2 flex justify-between">
        <div className="w-[70%]">
          {/* Pass the function to update user count */}
          <UserAnalytics isDashboard={true} onUserCountChange={setTotalUsers} />
        </div>
        <div className="justify-center items-center flex">
          <div>
            {/* Users Widget */}
            <div className="bg-white relative flex-col flex border border-t-[#4d62d9] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
              <span className="font-bold text-2xl tracking-widest pb-2 text-black">
                {totalUsers}
              </span>
              <span className="font-semibold text-sm text-gray-500">
                Users
              </span>
              <UsersIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e]" />
            </div>

            {/* Orders Widget */}
            <div className="bg-white relative flex-col flex border border-t-[#4d62d9] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
              <span className="font-bold text-2xl tracking-widest pb-2 text-black">
                {totalOrders}
              </span>
              <span className="font-semibold text-sm text-gray-500">
                Sales Obtained
              </span>
              <ScaleIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e]" />
            </div>

            {/* Courses Widget */}
            <div className="bg-white relative flex-col flex border border-t-[#4d62d9] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
              <span className="font-bold text-2xl tracking-widest pb-2 text-black">
                {totalCourses}
              </span>
              <span className="font-semibold text-sm text-gray-500">
                Courses
              </span>
              <BookOpenIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e]" />
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="grid-cols-2 flex justify-between">
        <div className="w-[48%]">
          {/* Pass the function to update order count */}
          <OrderAnalytics isDashboard={true} onOrderCountChange={setTotalOrders} />
        </div>
        <div className="w-[48%]">
          {/* Pass the function to update course count */}
          <CourseAnalytics isDashboard={true} onCourseCountChange={setTotalCourses} />
        </div>
      </div>

      <br />

      <div className="w-full">
        {/* Pass the function to update revenue count */}
        <RevenuePerOrder isDashboard={true} onRevenueCountChange={setTotalRevenue} />
      </div>
    </div>
  );
};

export default DashboardWidgets;
