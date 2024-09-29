import React, { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { signOut, useSession } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import { useLogOutMutation } from "../../../redux/features/auth/authApi";
import ChangePassword from "./ChangePassword";
import EnrolledCourses from "./EnrolledCourses";
import { ProfileSidebar } from "@/constants/enums";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || null); // Initialize with user.avatar
  const [active, setActive] = useState(ProfileSidebar.profileInfo);
  const [logoutUser, { isLoading }] = useLogOutMutation();
  const { data: session } = useSession();
  console.log("Session", session);

  const logoutHandler = async () => {
    await signOut({ redirect: false }); 
    await logoutUser({ success: true });
    window.location.reload();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto ">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-gray-800  bg-gray-50 bg-opacity-90 border dark:border-gray-500 rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === ProfileSidebar.profileInfo && (
        <div className="mt-[80px] h-full w-full bg-transparent  px-8">
          <ProfileInfo
            avatar={avatar}
            user={user}
            onAvatarUpdate={(newAvatar) => setAvatar(newAvatar)} // Update avatar state
          />
        </div>
      )}
      {active === ProfileSidebar.changePassword && (
        <div className="mt-[80px] h-full w-full bg-transparent px-8">
          <ChangePassword />
        </div>
      )}
      {active === ProfileSidebar.enrolledCourses && (
        <div className="mt-[80px] h-full w-full bg-transparent px-8">
          <EnrolledCourses />
        </div>
      )}
    </div>
  );
};

export default Profile;