"use client";
import React, { FC, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Banner from "../components/Home/Banner";
import Categories from "@/components/Home/Categories";
import FAQ from "@/components/Home/FAQ";
import { Footer } from "@/components/Home/Footer";


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        description="Learnix is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Next,Microservice"
        title="Learnix"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Banner setOpen={setOpen} />

      <Categories />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;