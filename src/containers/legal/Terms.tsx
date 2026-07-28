import { LandingMenu } from "../landingPage";

const Terms = () => {
  return (
    <div className="w-full min-h-screen bg-dark-1 text-gray-200">
      <div className="sm:p-5 px-5 flex flex-col w-full">
        <LandingMenu />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: July 27, 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Linkmonks ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Acceptable Use and Content Policy</h2>
            <p>
              You are responsible for all content, links, images, and information published on your Linkmonks page. You agree not to post malicious links, malware, phishing content, explicit adult content without appropriate tags, or materials violating intellectual property or copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Prohibited Handles and Reserving</h2>
            <p>
              Linkmonks reserves the right to reclaim, suspend, or reassign system handles, brand keywords, or offensive handles at its discretion to preserve product integrity and prevent impersonation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Pro Subscriptions and Payment</h2>
            <p>
              Pro plan entitlements and licensing are processed through Gumroad. Entitlement grants access to premium themes, unlimited link blocks, and advanced analytics. Subscriptions and single purchases are subject to Gumroad's terms and refund policies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
