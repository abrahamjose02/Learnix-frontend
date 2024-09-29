"use client";
import { useSearchParams } from "next/navigation";
import RoomUser from "../../components/LiveStream/Room/RoomUser";
import React, { useState } from "react";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams()
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const streamId = searchParams.get("caller-id");
  return (
    <>
      <Heading title={` Live Session | Learnix`} description="" keywords="" />
      {/* <Header
        open={open}
        setOpen={setOpen}
        activeItem={-1}
        setRoute={setRoute}
        route={route}
      /> */}
      <div className="mx-auto  bg-gray-50 ">
        {streamId && <RoomUser streamId={streamId} />}
      </div>
    </>
  );
};

export default Page;