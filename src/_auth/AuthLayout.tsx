import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/overview" replace />
      ) : (
        <section className="flex flex-1 justify-start items-center flex-col py-10 w-full">
          <Outlet />
        </section>
      )}
    </>
  );
}
