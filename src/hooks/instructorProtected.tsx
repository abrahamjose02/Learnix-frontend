"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function InstructorProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  const isInstructor = user?.role === "instructor";

  return isInstructor ? children : redirect("/");
}
