import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface Column {
  header: string | React.ReactNode;
  accessorKey?: string; 
  cell?: (info: { row: { original: any }, getValue: () => any }) => React.ReactNode; 
}

interface DataItem {
  [key: string]: any;
}

interface BasicTableProps {
  datas: DataItem[];
  columns: Column[] | any;
  type: string;
}

const BasicTable: React.FC<BasicTableProps> = ({ datas, columns, type }) => {
  const [sorting, setSorting] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");
  const data = useMemo(() => datas, [datas]);
  const router = useRouter();

  const table: any = useReactTable<DataItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
  });

  return (
    
    <div>
          <div className="flex flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-1/2 md:text-sm text-xs">
              <label className="sr-only"> Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-700 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={`Search ..`}
                />
              </div>
            </div>
            
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y text-left text-gray-700 dark:text-gray-400">
              <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 tracking-wider">
                {table.getHeaderGroups().map((headergroup : any) => (
                  <tr key={headergroup.id} >
                    {headergroup.headers.map((header: any) => (
                      <th
                        scope="col"
                        className="py-3 px-5 cursor-pointer"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row : any) => (
                  <tr
                    className="border-b dark:border-gray-700 text-xs md:text-sm"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell:any) => (
                      <td className=" py-1 px-1 md:px-5  md:py-3" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex mb-4 h-16 justify-center items-end gap-4">
              <button
                className="flex items-center gap-2"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </button>
              <div color="gray" className="font-normal text-xs">
                Page
                <strong className="text-gray-900">
                  {" "}
                  {table.getState().pagination.pageIndex + 1}
                </strong>{" "}
                of{" "}
                <strong className="text-gray-900">
                  {table.getPageCount()}
                </strong>
              </div>
              <button
                className="flex items-center gap-2"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </button>
            </div>
          </div>
      </div>


  )
}

export default BasicTable