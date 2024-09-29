"use client";
import Header from "../components/Header";
import Loader from "../components/ui/Loader/Loader";
import React, { useState } from "react";

type Props = {};

const LoaderComponent  = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <Loader />

    </div>
  );
};

export default LoaderComponent ;