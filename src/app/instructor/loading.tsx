"use client";
import Header from "../../components/Header";
import Sidebar from "../../components/Instructor/Sidebar/Sidebar";
import Loader from "../../components/ui/Loader/Loader";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const Loading = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const path = usePathname();
  const isRegister = path === "/instructor/register";
  return (
    <div>
      {!isRegister && <Sidebar active={7} />}
      {isRegister && (
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
      )}
      <Loader />
    </div>
  );
};

export default Loading;
