import React, { useEffect, useMemo, useState } from "react";
import { useGetRevenueAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";

type Props = {
  isDashboard?: boolean;
  onRevenueCountChange?: (totalRevenue: number) => void;
};

const RevenueAnalytics = ({ isDashboard, onRevenueCountChange }: Props) => {
  const instructorId = "admin";

  const { data, isLoading } = useGetRevenueAnalyticsQuery(instructorId);
  const revenueData = data && [...data].reverse();

  const totalRevenue = useMemo(() => {
    return data
      ? data.reduce(
          (sum: number, item: any) => sum + (item.totalInstructorRevenue || 0),
          0
        )
      : 0;
  }, [data]);

  useEffect(() => {
    if (onRevenueCountChange) {
      onRevenueCountChange(totalRevenue);
    }
  }, [totalRevenue, onRevenueCountChange]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return revenueData ? revenueData.slice(startIndex, endIndex) : [];
  }, [revenueData, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil((revenueData?.length || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`mt-[50px] ${
            isDashboard ? "shadow-md pb-5 rounded-md" : ""
          } bg-white dark:bg-gray-900`}
        >
          <div className={`${isDashboard && "!ml-8 mb-5"}`}>
            <div
              className={`${styles.title} ${
                isDashboard ? "text-sm px-5 !text-start text-blue-600" : ""
              } border-b-4 border-blue-500 pb-2`}
            >
              Revenue Analytics
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full text-left border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400">
                  <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">#</th>
                  <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">Course Name</th>
                  <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">Total Instructor Revenue</th>
                  <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">Total Admin Revenue</th>
                </tr>
              </thead>
              <tbody className="text-gray-900 dark:text-gray-100">
                {paginatedData?.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } dark:bg-gray-900 dark:hover:bg-blue-800 hover:bg-blue-50`}
                  >
                    <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-2">{item.courseName}</td>
                    <td className="px-4 py-2">₹{item.totalInstructorRevenue.toFixed(2)}</td>
                    <td className="px-4 py-2">₹{item.totalAdminRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 py-1 text-sm rounded ${
                    currentPage === page
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RevenueAnalytics;
