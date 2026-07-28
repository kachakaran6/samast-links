import { LandingMenu } from "../landingPage";

const Refunds = () => {
  return (
    <div className="w-full min-h-screen bg-dark-1 text-gray-200">
      <div className="sm:p-5 px-5 flex flex-col w-full">
        <LandingMenu />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Refund Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: July 27, 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">14-Day Refund Guarantee</h2>
            <p>
              We want you to be completely satisfied with Linkmonks Pro. If you are not satisfied with your Pro purchase for any reason within 14 days of purchase, you are eligible for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">How to Request a Refund</h2>
            <p>
              To request a refund, please contact support with your purchase email address and Gumroad license key or order receipt. Refunds are processed through Gumroad back to your original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Impact on Account Access</h2>
            <p>
              When a refund is processed, your Pro subscription entitlement will be revoked, and your account will automatically return to the Free plan tier. Your published links and profile content remain intact up to the Free plan limit.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Refunds;
