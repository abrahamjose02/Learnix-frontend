import { useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SidebarContext } from "./SidebarControl";

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  routerPath: string;
}

export function SidebarItem({
  icon,
  text,
  active = false,
  alert = false,
  routerPath,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();
  return (
    <li
      className={`
            font-Poppins text-sm
          relative flex items-center px-4 my-1 text-white
          font-light rounded-sm cursor-pointer
          transition-colors group max-h-[70px]
          ${expanded ? "py-4" : "py-4"}
          ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-300 text-indigo-800"
              : "hover:bg-gray-600 text-gray-600"
          }
      `}
      onClick={(e) => {
        e.stopPropagation();
        router.push(routerPath);
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-4" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-[#5624d0] ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-lg p-2 !text-xs ml-6
            bg-indigo-100 text-indigo-800
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
