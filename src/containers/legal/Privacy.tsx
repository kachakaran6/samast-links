import { LandingMenu } from "../landingPage";

const Privacy = () => {
  return (
    <div className="w-full min-h-screen bg-dark-1 text-gray-200">
      <div className="sm:p-5 px-5 flex flex-col w-full">
        <LandingMenu isLoggedIn={false} />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: July 27, 2026</p>

        <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>
              When you use Linkmonks, we collect account information such as your name, email address, password hash,
              profile avatar, display name, bio, and custom destination links you add to your page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Usage and Click Analytics</h2>
            <p>
              To provide basic link performance insights to page creators, Linkmonks records aggregated click counts when visitors select links. We do not track visitors across external websites, sell visitor data, or build advertising profiles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Data Security and Storage</h2>
            <p>
              Your personal data and profile settings are stored securely using Supabase authentication and encrypted PostgreSQL database storage. We employ Row Level Security (RLS) policies to ensure only authorized account owners can edit private information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Account Deletion and Rights</h2>
            <p>
              You have the right to request deletion of your Linkmonks account and associated link data at any time from your Account Settings page or by contacting support.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
