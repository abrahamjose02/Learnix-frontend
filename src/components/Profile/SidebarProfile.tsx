import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/user.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  user: any;
  avatar: string | null;
  active: number;
  logoutHandler: any;
  setActive: (active: number) => void;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  logoutHandler,
  setActive,
}) => {
  const handleInstructorClick = () => {
    if (!user.isVerified) {
      toast.error("Instructor is not verified by admin.");
    } else {
      window.location.href = "/instructor";
    }
  };
  return (
    <div className="w-full">
      <div
        className={`w-full h-16 border-b flex items-center px-3 py-4 cursor-pointer shadow-md hover:bg-blue-gray-50  ${
          active === 1 ? "dark:bg-gray-600 bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={avatar || avatarDefault}
          alt="Profile avatar"
          width={30}
          height={30}
          className="rounded-full cursor-pointer w-[30px] h-[30px] 800px:w-30px"
        />
        <h5 className="pl-6 800px:block hidden font-Poppins dark:text-white text-black text-sm font-thin">
          My Account
        </h5>
      </div>

      <div
        className={`w-full h-16 border-b flex items-center px-4 py-4 cursor-pointer hover:bg-blue-gray-50  ${
          active === 2
            ? "dark:bg-gray-600 border-b shadow-sm bg-gray-200 "
            : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-6 800px:block hidden font-Poppins dark:text-white text-black text-sm font-thin">
          Change Password
        </h5>
      </div>
      {user.role === "user" && (
        <div
          className={`flex h-16 w-full cursor-pointer items-center border-b px-4 py-4 hover:bg-blue-gray-50 ${
            active === 3
              ? "border-b bg-gray-200 shadow-sm dark:bg-gray-600 "
              : "bg-transparent"
          }`}
          onClick={() => setActive(3)}
        >
          <SiCoursera size={20} className="dark:text-white text-black" />
          <h5 className="hidden pl-6 font-Poppins text-sm  font-thin dark:text-white text-black 800px:block">
            Enrolled Courses
          </h5>
        </div>
      )}

      {user.role === "admin" && (
        <Link
          className={`w-full h-16 border-b flex items-center px-4 py-4 cursor-pointer hover:bg-blue-gray-50 bg-transparent`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="dark:text-white text-black"
          />
          <h5 className="pl-6 800px:block hidden font-Poppins dark:text-white text-black text-sm font-thin">
            Admin Dashboard
          </h5>
        </Link>
      )}

      {user.role === "instructor" && (
        <div
          className={`flex h-16 w-full cursor-pointer items-center border-b bg-transparent px-4 py-4 hover:bg-blue-gray-50`}
          onClick={handleInstructorClick}
        >
          <HiAcademicCap size={20} className="dark:text-white text-black " />
          <h5 className="hidden pl-6 font-Poppins text-sm  font-thin dark:text-white text-black 800px:block">
            Instructor Dashboard
          </h5>
        </div>
      )}

      <div
        className={`w-full h-16 border-b flex items-center px-4 py-4 cursor-pointer hover:bg-blue-gray-5 bg-transparent hover:bg-blue-gray-50 `}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-6 800px:block hidden font-Poppins  dark:text-white  text-black text-sm font-thin">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;