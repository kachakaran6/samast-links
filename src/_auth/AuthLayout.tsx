import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated, user } = useUserContext();

  return (
    <>
      {user.emailVerification && user.status && isAuthenticated ? (
        <Navigate to="/link" />
      ) : (
        <>
          <section className="flex flex-1 justify-start items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
}
