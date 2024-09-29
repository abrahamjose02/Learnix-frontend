import React, { useState, ReactNode, createContext } from "react";
import { MoreVertical } from "lucide-react";
import { HiAcademicCap } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface SidebarContextProps {
  expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextProps>({
  expanded: true,
});

interface SidebarProps {
  children: ReactNode;
}

const SidebarControl: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <aside
      className={`h-screen bg-[#1e1f20] fixed left-0 top-0 font-Poppins !z-9999999 ${
        expanded ? "min-w-[16.6%]" : "min-w-[3.70%]"
      }`}
    >
      <nav
        className="h-full flex flex-col  border-r border-gray-800 shadow-sm "
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-4 pb-2 flex justify-between items-center mb-8 mt-6 ">
          <div className="flex">
            <HiAcademicCap
              size={35}
              className={`text-[#fff] cursor-pointer rounded`}
              onClick={() => setExpanded(!expanded)}
            />
            <p
              className={`overflow-hidden transition-all font-Poppins text-xl text-white text-center justify-center flex align-middle ${
                !expanded && "hidden"
              }`}
            >
              <span className="font-semibold tracking-wide mt-1 text-2xl ml-3">
                Learnix
              </span>
            </p>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-1">{children}</ul>
        </SidebarContext.Provider>

        <div
          className="border-t flex p-3 cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <img
            src={
              user.avatar
                ? user.avatar
                : "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            }
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white text-[14px]">
                {user.name}
              </h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarControl;
