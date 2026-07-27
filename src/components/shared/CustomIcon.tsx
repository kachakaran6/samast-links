import { FaGithub } from "react-icons/fa";
import { RiLinksLine } from "react-icons/ri";
import { RxDividerHorizontal } from "react-icons/rx";
import { LuSpace } from "react-icons/lu";
import { TbBrandYoutube, TbTextRecognition } from "react-icons/tb";

const CustomIcon = ({ icon, className }: any) => {
  switch (icon) {
    case "simple_link":
      return <RiLinksLine className={className} />;
    case "github_card":
      return <FaGithub className={className} />;
    case "divider":
      return <RxDividerHorizontal className={className} />;
    case "space":
      return <LuSpace className={className} />;
    case "text":
      return <TbTextRecognition className={className} />;
    case "github_contributions":
      return <FaGithub className={className} />;
    case "youtube_video":
      return <TbBrandYoutube className={className} />;
    case "github_repo_card":
      return <FaGithub className={className} />;
    default:
      return null;
  }
};

export default CustomIcon;
