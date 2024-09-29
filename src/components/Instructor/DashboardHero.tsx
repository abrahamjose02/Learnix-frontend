"use client";
import React from "react";
import DashboardHeader from "./DashboardHeader";
type Props = {
  instructorId?: string;
};

const DashboardHero = ({ instructorId }: Props) => {
  return <DashboardHeader instructorId={instructorId} />;
};

export default DashboardHero;