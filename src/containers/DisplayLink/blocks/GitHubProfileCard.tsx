import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";

interface GithubUserType {
  name: string;
  html_url: string;
  avatar_url: string;
  login: string;
  public_repos: number;
  followers: number;
}

const INITIAL_USER = {
  name: "",
  html_url: "",
  avatar_url: "",
  login: "",
  public_repos: 0,
  followers: 0,
};

const GitHubProfileCard = ({ username }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<GithubUserType>(INITIAL_USER);
  const getGithubUser = async () => {
    setIsLoading(true);
    try {
      await fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        });
    } catch (error) {
      console.log("validateUsername error", error);
    }
    setIsLoading(false);
    return false;
  };

  useEffect(() => {
    getGithubUser();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-between block-bg block-shadow p-3 rounded-xl sm:w-max w-full sm:px-10 m-auto">
          <div className={`flex gap-2 flex-col w-full`}>
            <div className="mx-auto my-2 text-lg w-max">GitHub Profile</div>
            <div className="flex gap-2 items-center justify-center flex-col">
              <div className="h-14 w-14 border-2 overflow-hidden text-sm font-medium uppercase bg-gray-900 text-white rounded-full flex-center">
                <img src={userData?.avatar_url} />
              </div>
              <div className="flex flex-col gap-0.5 w-[80%] items-center">
                <div className="text-sm font-normal text-gray-700">
                  @{userData?.login}
                </div>
                <div className="text-base font-medium">{userData?.name}</div>
              </div>
            </div>
            <div className="w-full flex flex-center gap-3">
              <div className="flex-col gap-0.5 block-shadow p-2 flex-center rounded-xl min-w-[110px]">
                <div className="text-sm font-medium text-gray-600">
                  Repositories
                </div>
                <div>{userData?.public_repos}</div>
              </div>
              <div className="flex-col gap-0.5 block-shadow p-2 flex-center rounded-xl min-w-[110px]">
                <div className="text-sm font-medium text-gray-600">
                  Followers
                </div>
                <div>{userData?.followers}</div>
              </div>
            </div>
            <div className="mx-auto w-max">
              <a href={userData?.html_url} target="_blank">
                <Button className="bg-dark-4 block-shadow mt-3 !py-1 h-8 flex gap-2">
                  <Github className="h-5" />
                  View Profile
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubProfileCard;
