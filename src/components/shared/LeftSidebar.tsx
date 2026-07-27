import { Link, NavLink, useLocation } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { FaRegCreditCard } from "react-icons/fa6";

const LeftSidebar = ({ setOpenLogoutModal, openLogoutModal }: any) => {
  const { pathname } = useLocation();
  const { user, isLoading } = useUserContext();
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-8">
        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              height={20}
              width={20}
              className="h-8 w-8 rounded-full"
              data-tooltip-id="tooltip"
              data-tooltip-content={"Your Profile"}
              data-tooltip-place="right"
            />
          </Link>
        )}

        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link: INavLink) => {
            const isActive =
              (pathname != "/link/create" && pathname.includes(link.route)) ||
              pathname == link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group w-max ${
                  isActive && "bg-primary-500"
                }`}
                data-tooltip-id="tooltip"
                data-tooltip-content={link.label}
                data-tooltip-place="right">
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-2">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    height={20}
                    width={20}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex-center flex-col">
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
        <Button
          variant="ghost"
          className="shad-button_ghost"
          data-tooltip-id="tooltip"
          data-tooltip-content={"Logout"}
          data-tooltip-place="right"
          onClick={() => setOpenLogoutModal(!openLogoutModal)}>
          <img src="/assets/icons/logout.svg" alt="logout" />
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
