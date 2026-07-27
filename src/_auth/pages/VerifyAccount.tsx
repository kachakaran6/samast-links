import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";
import { updateVerification, verifyEmail } from "@/lib/appwrite/api";
import { maskEmail, showToast } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const sendVerificationLink = async () => {
    setLoading(true);
    const isSent: any = await verifyEmail();
    if (isSent) {
      if (!isSent.code) {
        showToast({
          msg: "Email sent successfully",
        });
        localStorage.setItem("requestVerifySent", "true");
      } else {
        showToast({
          msg: isSent?.message,
        });
      }
      setLoading(false);
    }
  };

  const verifySecret = async (userId: any, secret: any) => {
    const isUpdated: any = await updateVerification(userId, secret);
    if (isUpdated) {
      if (!isUpdated.code) {
        showToast({
          msg: "Email Verified Successfully",
        });
        navigate("/link");
      } else {
        showToast({
          msg: isUpdated?.message,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    if (secret && userId && user?.email) {
      if (!user?.emailVerification) {
        verifySecret(userId, secret);
      } else {
        navigate("/link");
      }
    } else {
      if (user?.email) {
        if (!user?.emailVerification) {
          if (!localStorage.getItem("requestVerifySent")) {
            sendVerificationLink();
          }
        } else {
          navigate("/link");
        }
      }
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className="flex-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex-center flex-col gap-8">
          <div className="text-gradient flex-center text-3xl">
            Verify Account
          </div>
          <div className="flex flex-col gap-5 flex-center text-center w-[90%] max-w-[400px]">
            <div className="text-sm font-medium">
              We have sent an email to this email address
            </div>
            <div className="text-gradient text-lg font-medium">{`${maskEmail(
              user?.email
            )}`}</div>
            <div className="text-sm text-gray-500">
              Open your email inbox and check an email from appwrite. click the
              link given in email to verify your account
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-base text-gray-300">
                Not recieved? must check your spam inbox
              </div>
              <div className="my-2 text-primary">OR</div>
              <Button
                className="shad-button_primary"
                onClick={() => {
                  sendVerificationLink();
                }}
                disabled={loading}>
                {loading ? (
                  <div className="flex-center gap-2">
                    <Loader /> Sending...
                  </div>
                ) : (
                  "Resend verification link"
                )}
              </Button>
              <div className="text-base text-gray-300">
                Wrong credentials{" "}
                <Link to={"/auth/sign-in"} className="text-primary">
                  back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
