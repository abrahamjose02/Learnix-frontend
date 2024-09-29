"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "@/utils/NavItems";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import Verification from "../components/Verification";
import ForgotPassword from "./ForgotPassword";
import VerifyResetCode from "./VerifyResetCode";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setRoute: (route: string) => void;
  route: string;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setopenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { user: reduxUser } = useSelector((state: any) => state.auth);

  const [user, setUser] = useState<any>();
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  const socialauth = async () => {
    if (data) {
      await socialAuth({
        email: data.user?.email,
        name: data.user?.name,
        avatar: data.user?.image,
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (!userData) {
      if (data) {
        socialauth();
      }
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    } else if (!isLoading) {
      refetch();
    }
  }, [reduxUser, userData]);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setopenSidebar(false);
      refetch();
    }
  };

  return (
    <div className="relative z-[9999] w-full px-[12%] shadow-sm">
      <div
        className={`${
          active
            ? " fixed left-0 top-0 z-[80] h-[90px] w-full  shadow-xl transition duration-500"
            : "z-[80]  h-[65px] w-full 800px:h-[90px]"
        }`}
      >
        <div className="m-auto h-full 800px:py-2 ">
          <div className="flex h-[100px] w-full items-center justify-between ">
            <div className="flex">
              <Link
                href="/"
                className={`font-BebasNeue mr-6 text-[70px] font-[900] text-black`}
              >
                <img
                  src="/assets/learnix1.png"
                  className=" my-5 w-[180px] h-auto "
                />
              </Link>
            </div>
            
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} user={user} />

              {/* for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-black"
                  onClick={() => setopenSidebar(true)}
                />
              </div>

              {/* for desktop */}
              {data || user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user?.avatar ? user.avatar : "/assets/user.png"}
                    alt="usericon"
                    width={30}
                    height={30}
                    className="ml-5 hidden cursor-pointer rounded-full 800px:block"
                    style={{
                      border: activeItem === 5 ? "2px solid black" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUser
                  size={23}
                  className="ml-5 mr-3 hidden cursor-pointer text-black 800px:block"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* sidebar for mobile */}
        {openSidebar && (
          <div
            className="fixed left-0 top-0 z-[99999] h-screen w-full bg-[#00000024] dark:bg-[unset] "
            onClick={handleClose}
            id="screen"
          >
            <div className="dark:bg-slate-900 fixed right-0 top-0 z-[99999999] h-screen w-[70%] bg-white dark:bg-opacity-90">
              <NavItems activeItem={activeItem} isMobile={true} user={user} />
              {data || user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user?.avatar ? user.avatar : "/assets/user.png"}
                    alt="usericon"
                    width={40}
                    height={40}
                    className="ml-5 cursor-pointer rounded-full 800px:block"
                    style={{
                      border: activeItem === 5 ? "2px solid black" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUser
                  size={20}
                  className="ml-5 mr-3 hidden cursor-pointer text-black dark:text-white 800px:block"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              <p className="px-2 pl-5 text-[16px] text-black dark:text-white">
                Copyright @ 2024 Learnix
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "SignUp" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
      {route === "ForgotPassword" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={ForgotPassword}
            />
          )}
        </>
      )}
      {route === "VerifyResetCode" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={VerifyResetCode}
            />
          )}
        </>
      )}
      {route === "ResetPassword" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={ResetPassword}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
