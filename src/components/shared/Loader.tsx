import { Loader2Icon } from "lucide-react";

const Loader = ({ height = 24, width = 24, className = "text-white" }) => (
  <div className="flex-center w-full">
    <Loader2Icon
      width={width}
      height={height}
      className={`animate-spin ${className}`}
    />
  </div>
);

export default Loader;
