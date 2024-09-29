import React, { useState, useMemo } from "react";
import { useGetInstructorRevenueAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";

type Props = {
  isDashboard?: boolean;
  instructorId: string;
};

const InstructorRevenueAnalytics = ({ isDashboard, instructorId }: Props) => {
  const { data, isLoading } = useGetInstructorRevenueAnalyticsQuery(
    instructorId,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Memoized table data
  const revenueData = useMemo(() => {
    return (
      data &&
      data.map((item: any, index: number) => ({
        serialNumber: index + 1,
        courseName: item.courseName,
        instructorRevenue: item.totalInstructorRevenue,
      }))
    );
  }, [data]);

  // Calculate paginated data
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
    <div
      className={`mt-[50px] ${
        isDashboard ? "w-full" : "w-[90%]"
      } bg-white dark:bg-gray-900 shadow-md rounded-md p-5`}
    >
      <div
        className={`${styles.title} ${
          isDashboard && "text-sm px-5 !text-start text-blue-600"
        } border-b-4 border-blue-500 pb-2`}
      >
        Instructor Revenue Analytics
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full text-left border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400">
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  #
                </th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  Course Name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  Instructor Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((item: any) => (
                  <tr
                    key={item.serialNumber}
                    className="bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-800"
                  >
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {item.serialNumber}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {item.courseName}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      ₹{item.instructorRevenue.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-2 text-center text-gray-900 dark:text-gray-100"
                  >
                    No data available.
                  </td>
                </tr>
              )}
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
      )}
    </div>
  );
};

export default InstructorRevenueAnalytics;
