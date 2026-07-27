import { LandingMenu } from ".";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { linkBlocks } from "@/constants";
import CustomIcon from "@/components/shared/CustomIcon";
import { Link } from "react-router-dom";
import { appConfig } from "@/lib/config/appConfig";
import PricingCards from "@/components/shared/PricingCards";
import { ChevronDown, ExternalLink } from "lucide-react";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    const currentUser = localStorage.getItem("currentUser");
    if (
      (currentUser && cookieFallback) === "[]" ||
      (currentUser && cookieFallback) === null ||
      (currentUser && cookieFallback) === undefined
    ) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const faqs = [
    {
      q: "What is Linkmonks?",
      a: "Linkmonks provides a single, polished link-in-bio page for creators, freelancers, and businesses to share all their important social profiles, content, and links using one clean URL.",
    },
    {
      q: "What format will my public URL take?",
      a: "Your public Linkmonks page URL will take the form of links.samast.pro/yourhandle or your custom handle format.",
    },
    {
      q: "Is there a Free tier?",
      a: "Yes! The Free plan gives you up to 5 links, standard editorial themes, responsive mobile layout, and basic click tracking forever.",
    },
    {
      q: "What comes with Linkmonks Pro?",
      a: "Pro unlocks unlimited links, all editorial themes (including Harbor), custom accent color picker, button shape options, removal of the Linkmonks footer badge, and 90-day trend analytics.",
    },
    {
      q: "How does payment and fulfillment work?",
      a: "Payments are processed securely via Gumroad. After purchasing Pro, you receive a license key which instantly activates Pro features on your account.",
    },
    {
      q: "What is the refund policy?",
      a: "We offer a 14-day refund policy. If Linkmonks Pro does not meet your needs, contact support within 14 days for a full refund.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-dark-1 text-gray-200">
      <div className="absolute inset-0 opacity-[0.15] z-[0] pointer-events-none">
        <img
          src="/assets/images/pattern-checked.svg"
          alt={appConfig?.appName}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="sm:p-5 px-5 flex flex-col w-full z-10 relative">
        <LandingMenu isLoggedIn={isLoggedIn} />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col py-24 px-4 gap-8 items-center mt-5 justify-center max-w-4xl mx-auto text-center z-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-4 border border-dark-3 text-xs text-primary-500 font-medium">
          <span>✨ Linkmonks Phase 1 is Live</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
          One clean home for every link worth <span className="text-gradient">sharing</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          Put your Instagram, LinkedIn, YouTube, booking, and store destinations behind one cohesive editorial bio page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2">
          <Link
            to={isLoggedIn ? "/link" : "/auth/sign-up"}
            className="bg-[linear-gradient(50deg,_#bc48ff_0%,_#1ca9c9_50%)] p-[1px] rounded-[9px] w-full sm:w-auto">
            <Button className="!h-12 px-8 w-full text-base font-semibold rounded-lg bg-dark-3 hover:bg-dark-4">
              {isLoggedIn ? "Open Dashboard" : "Create Your Page Free"}
            </Button>
          </Link>

          <a
            href="https://links.samast.pro/demo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            View Example Page <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <Separator className="w-3/4 max-w-4xl mx-auto my-12 h-[1px] bg-gray-800" />

      {/* Feature Showcase */}
      <div id="features" className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            All the <span className="text-gradient">Blocks</span> You Need
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Share content, social profiles, embeds, and destination links your way.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-8">
          {linkBlocks.map((ele: any, i: any) => (
            <div
              key={ele + "_" + i}
              className="flex items-center gap-3 bg-dark-3/60 p-3 px-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
              <CustomIcon
                icon={ele?.block_type}
                className="text-primary-500 w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-200">{ele?.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-dark-2/50 border-y border-gray-800/60" id="pricing">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Simple, Honest <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-gray-400">Start free. Upgrade to Pro when you want full visual & analytics control.</p>
          </div>
          <PricingCards />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-xl bg-dark-3/30 overflow-hidden cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <div className="flex items-center justify-between p-5 font-medium text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? "rotate-180 text-primary-500" : "text-gray-400"}`} />
              </div>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-gray-400 border-t border-gray-800/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 bg-dark-2 text-sm text-gray-400">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-bold text-lg text-white">Linkmonks</span>
            <span className="text-xs text-gray-500">© 2026 Linkmonks. All rights reserved.</span>
          </div>

          <div className="flex gap-6 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refunds" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>

          <div className="text-xs text-gray-500">
            Support: <a href="mailto:support@samast.pro" className="text-primary-500 underline">support@samast.pro</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
