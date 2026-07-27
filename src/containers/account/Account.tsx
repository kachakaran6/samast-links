import { useUserContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";

const Account = () => {
  const { user } = useUserContext();
  const { links } = useLinkContext();

  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-start w-full p-5  max-sm:px-2 rounded-lg bg-dark-3 m-5">
        <div className="flex w-max gap-4 p-2 px-4 border border-dark-4 border-dashed rounded-lg">
          <div className="h-10 w-10 rounded-full object-cover overflow-hidden">
            <img
              src={user.imageUrl}
              alt={user.name}
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div className="border-dark-4 p-2 px-4 rounded-lg text-xl text-primary-500">
            {user?.name}
          </div>
        </div>
        <div className="flex w-max gap-4 p-2 px-4 border border-dark-4 border-dashed rounded-lg">
          <div className="font-medium text-base text-gray-400">Email :</div>
          <div>{user?.email}</div>
        </div>
        <div className="flex w-max gap-4 p-2 px-4 border border-dark-4 border-dashed rounded-lg">
          <div className="font-medium text-base text-primary-500">
            Total Links :
          </div>
          <div>{links?.length}</div>
        </div>
      </div>
    </>
  );
};

export default Account;
