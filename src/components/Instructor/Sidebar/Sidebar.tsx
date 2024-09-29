"use client";
import React from "react";
import SidebarControl from "../../Sidebar/SidebarControl";
import { SidebarItem } from "../../Sidebar/SidebarItems";
import {
  CloudArrowDownIcon,
  ComputerDesktopIcon,
  DocumentPlusIcon,
  HomeIcon,
  PresentationChartBarIcon,
  SignalIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { EISidebar } from "../../../constants/enums";

type Props = {
  active: number;
};

const Sidebar: React.FC<Props> = ({ active }) => {
  return (
    <div className="!z-[99]">
      <SidebarControl>
        <SidebarItem
          icon={<PresentationChartBarIcon className="w-6" />}
          text={"Dashboard"}
          routerPath="/instructor"
          active={active === EISidebar.dashboard ? true : false}
        />
        <SidebarItem
          icon={<DocumentPlusIcon className="w-6" />}
          text={"Create Course"}
          routerPath="/instructor/create-course"
          active={active === EISidebar.createCourse ? true : false}
        />
        <SidebarItem
          icon={<ComputerDesktopIcon className="w-6" />}
          text={"All Courses"}
          routerPath="/instructor/courses"
          active={active === EISidebar.allCourse ? true : false}
        />
        <SidebarItem
          icon={<WrenchScrewdriverIcon className="w-6" />}
          text={"Edit Course"}
          routerPath="/instructor/courses"
          active={active === EISidebar.editCourse ? true : false}
        />
        <SidebarItem
          icon={<CloudArrowDownIcon className="w-7" />}
          text={"Upload Media"}
          routerPath="/instructor/upload-media"
          active={active === EISidebar.uploadMedia ? true : false}
        />

        <SidebarItem
          icon={<SignalIcon className="w-7" />}
          text={"Go Live"}
          routerPath="/instructor/live-session"
          active={active === EISidebar.live ? true : false}
        />
        <SidebarItem
          icon={<HomeIcon className="w-6" />}
          text={"Home"}
          routerPath="/"
          active={false}
        />
      </SidebarControl>
    </div>
  );
};

export default Sidebar;