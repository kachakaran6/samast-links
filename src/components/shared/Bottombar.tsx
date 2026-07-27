import { Link, NavLink, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";
import { EyeIcon } from "lucide-react";
import { FaRegCreditCard } from "react-icons/fa6";

const Bottombar = () => {
  const { pathname } = useLocation();

  const handlePreviewClick = () => {
    const showPreviewEvent = new Event("showPreview", { bubbles: true });
    document.dispatchEvent(showPreviewEvent);
  };

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive =
          (pathname != "/link/create" && pathname.includes(link.route)) ||
          pathname == link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive ? "bg-primary-500" : ""
            } flex-center p-2 transition w-max rounded-full`}>
            <img
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              className={`${isActive && "invert-white"}`}
            />
          </Link>
        );
      })}
      <div
        className={`leftsidebar-link group w-max ${
          pathname === "subscriptions" && "bg-primary-500"
        }`}
        data-tooltip-id="tooltip"
        data-tooltip-content={"Subscriptions"}
        data-tooltip-place="right">
        <NavLink to={"subscription"} className="flex gap-4 items-center p-2">
          <FaRegCreditCard className="h-5  w-5 text-[#ccc]" />
        </NavLink>
      </div>
      <div
        onClick={handlePreviewClick}
        className={`flex-center p-2 transition w-max rounded-full`}>
        <EyeIcon className="cursor-pointer stroke-[#ccc]" />
      </div>
    </section>
  );
};

export default Bottombar;
