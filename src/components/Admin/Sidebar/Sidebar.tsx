"use client";
import React, { useContext } from "react";
import SidebarControl, { SidebarContext } from "../../Sidebar/SidebarControl";
import { SidebarItem } from "../../Sidebar/SidebarItems";
import {
  AcademicCapIcon,
  HomeIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  TvIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { EISidebar } from "../../../constants/enums";

type Props = {
  active: number;
};

const Sidebar: React.FC<Props> = ({ active }) => {
  return (
    <>
      <SidebarControl>
        <SidebarItem
          icon={<TvIcon className="w-6" />}
          text={"Dashboard"}
          routerPath="/admin"
          active={active === 0 ? true : false}
        />
        <SidebarItem
          icon={<UserGroupIcon className="w-6" />}
          text={"Users"}
          routerPath="/admin/users"
          active={active === 1 ? true : false}
        />
        <SidebarItem
          icon={<AcademicCapIcon className="w-6" />}
          text={"Instructors"}
          routerPath="/admin/instructors"
          active={active === 2 ? true : false}
        />

        <SidebarItem
          icon={<PencilSquareIcon className="w-6" />}
          text={"FAQ"}
          routerPath="/admin/faq"
          active={active === 3 ? true : false}
        />

        <SidebarItem
          icon={<Squares2X2Icon className="w-6" />}
          text={"Categories"}
          routerPath="/admin/categories"
          active={active === 4 ? true : false}
        />

        <SidebarItem
          icon={<HomeIcon className="w-6" />}
          text={"Home"}
          routerPath="/"
          active={active === 5 ? true : false}
        />
      </SidebarControl>
    </>
  );
};

export default Sidebar;