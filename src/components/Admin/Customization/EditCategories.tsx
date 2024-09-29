import React, { useEffect, useState } from "react";
import {
  useAddCategoriesMutation,
  useGetCategoriesQuery,
} from "../../../../redux/features/admin/adminApi";
import { styles } from "../../../styles/style";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading } = useGetCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [categories, setCategories] = useState<any[]>([]);

  const [addCategories, { isLoading: addCategoryLoading, error, isSuccess }] =
    useAddCategoriesMutation();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleCategoryChange = (id: any, value: string) => {
    setCategories((prev) =>
      prev.map((q) => (q._id === id ? { ...q, category: value } : q))
    );
  };

  const newCategoryHandler = () => {
    setCategories([
      ...categories,
      {
        _id: new Date().getTime().toString(),
        category: "",
      },
    ]);
  };

  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories.some((q) => q.category === "");
  };

  const areCategoriesUnchanged = (original: any[], newCategories: any[]) => {
    return JSON.stringify(original) === JSON.stringify(newCategories);
  };

  const handleEdit = async () => {
    const newData = categories.map((item: any) => ({
      category: item.category,
    }));
    await addCategories(newData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Categories updated successfully");
    }
  }, [isSuccess]);

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
      <div className="mt-12 bg-white dark:bg-gray-800 shadow-sm p-4 rounded-md">
        <dl className="space-y-3">
          {categories.map((q: any) => (
            <div
              key={q._id}
              className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1 flex justify-between pr-2"
            >
              <dt className="text-lg w-[80%]">
                <button className="flex items-start text-black dark:text-white justify-between w-full text-left focus:outline-none">
                  <input
                    className={`${styles.input} border-none bg-transparent dark:text-white`}
                    value={q.category}
                    onChange={(e: any) =>
                      handleCategoryChange(q._id, e.target.value)
                    }
                    placeholder="Add your category.."
                  />
                </button>
              </dt>
              <span className="items-center justify-center pt-2">
                <AiOutlineDelete
                  className="text-black dark:text-white text-sm cursor-pointer h-5 w-5"
                  onClick={() => {
                    setCategories((prev) =>
                      prev.filter((item) => item._id !== q._id)
                    );
                  }}
                />
              </span>
            </div>
          ))}
        </dl>
        <br />
        <IoMdAddCircleOutline
          className="text-black dark:text-white text-lg cursor-pointer h-7 w-7"
          onClick={newCategoryHandler}
        />
      </div>
      <div
        className={`${
          styles.button
        } !w-[100px] !min-h-[35px] !h-[35px] text-white font-thin bg-[#cccccc34] dark:bg-gray-600 mt-4 !text-sm justify-end items-center float-right
        ${
          areCategoriesUnchanged(data, categories) ||
          isAnyCategoryEmpty(categories)
            ? "!cursor-not-allowed"
            : "!cursor-pointer"
        }`}
        onClick={
          areCategoriesUnchanged(data, categories) ||
          isAnyCategoryEmpty(categories)
            ? () => null
            : handleEdit
        }
      >
        Save
      </div>
    </div>
  );
};

export default EditCategories;
