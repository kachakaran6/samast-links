import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";

const Topbar = ({ openLogoutModal, setOpenLogoutModal }: any) => {
  const { user } = useUserContext();

  return (
    <section className="topbar">
      <div className="flex-between py-2 px-5">
        <Link to={`/profile/${user.id}`} className="flex-center gap-3 ">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-8 w-8 rounded-full md:hidden"
          />
        </Link>
        <Link to="/link" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.png"
            alt="logo"
            width={32}
            height={32}
          />{" "}
          Linkmonks
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => setOpenLogoutModal(!openLogoutModal)}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
