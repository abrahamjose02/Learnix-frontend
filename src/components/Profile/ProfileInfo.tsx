import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import avatarIcon from "../../../public/assets/user.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { toast } from "sonner";

type Props = {
  avatar: any;
  user: any;
  onAvatarUpdate: (avatar: string) => void;
};

const ProfileInfo: FC<Props> = ({ avatar, user, onAvatarUpdate }) => {
  const [name, setName] = useState(user?.name || "");
  const [initialName, setInitialName] = useState(user?.name || "");
  const imageRef = useRef<HTMLInputElement>(null);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editprofile, { isSuccess: profileSuccess, error: profileError }] =
    useEditProfileMutation();
  const [userAvatar, setUserAvatar] = useState(
    user?.avatar || avatar || avatarIcon
  );
  const { refetch } = useLoadUserQuery(undefined, {});

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const imageHandler = async (e: any) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    const response = await updateAvatar(formData);

    if (response?.data?.avatar) {
      setUserAvatar(response.data.avatar);
      onAvatarUpdate(response.data.avatar);
      toast.success(response.data.message);
      refetch();
    } else {
      toast.error("Failed to update avatar");
    }
  };

  useEffect(() => {
    if (profileSuccess) {
      toast.success("Profile updated Successfully");
    }
    if (error || profileError) {
      console.log(error);
    }
  }, [error, profileError, profileSuccess]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "" && name !== initialName) {
      await editprofile({ name });
      setInitialName(name);
    } else if (name === initialName) {
      toast.info("No changes made to the name");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={userAvatar}
            alt=""
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
            width={120}
            height={120}
            onClick={handleImageClick}
          />
          <form encType="multipart/form-data">
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png, image/jpg, image/jpeg, image/webp"
              ref={imageRef}
            />
          </form>

          <label>
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100] pb-2">
              <label className="block font-Poppins">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] 800px:mb-0 text-base`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100]">
              <label className="block pt-2 font-Poppins">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-[95%] 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;