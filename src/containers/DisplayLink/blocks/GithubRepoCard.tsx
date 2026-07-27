import { Github } from "lucide-react";
import { useEffect, useState } from "react";
const GithubRepoCard = ({ link, name, desc, tags }: any) => {
  const [allTags, setAllTags] = useState([]);
  useEffect(() => {
    let tagsArr = tags.split(",");
    setAllTags(tagsArr);
  }, []);

  return (
    <a href={link} target="_blank">
      <div className="flex items-start justify-between block-bg block-shadow p-3 rounded-xl w-full">
        <div className={`flex gap-2 flex-col w-[80%]`}>
          <div className="flex gap-2 items-center">
            <div className="h-5 w-5 text-sm font-medium uppercase bg-dark-4 text-white rounded-full flex-center">
              {name.charAt(1)}
            </div>
            <div className="text-base font-medium">{name}</div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-sm font-normal text-gray-700">{desc}</div>
            <div className="flex gap-2 w-ful overflow-x-auto scrollbar-none">
              {allTags.map((tag: any, i: any) => (
                <div
                  key={tag + "_" + i}
                  className="bg-dark-4 w-max whitespace-nowrap text-white p-1 px-3 rounded-md text-xs">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-2 bg-white rounded-xl">
          <Github />
        </div>
      </div>
    </a>
  );
};

export default GithubRepoCard;
