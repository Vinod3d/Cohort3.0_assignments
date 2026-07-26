import React from "react";
import { Link } from "react-router";
import { FiAward, FiTruck, FiShield, FiHeart, FiUsers, FiShoppingBag, FiArrowRight } from "react-icons/fi";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Header */}
      <div className="relative rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-16 mb-16 overflow-hidden text-center sm:text-left">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-[0.02]"></div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="text-primary text-xs sm:text-sm font-body font-semibold tracking-widest uppercase mb-3">
            Our Journey & Vision
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-6xl text-foreground leading-tight mb-6">
            Redefining Ecommerce.
            <br />
            <span className="text-primary">Built for the future.</span>
          </h1>
          <p className="text-foreground/60 font-body text-base sm:text-lg leading-relaxed mb-8">
            SkyMart is a premium, next-generation shopping platform curated to bring you the highest quality products at unmatched direct-to-consumer prices. We combine lightning-fast logistics with elegant online experiences.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-background font-bold font-body text-sm px-6 py-4 rounded-2xl hover:bg-volt-light transition-all shadow-lg shadow-primary/10 hover:shadow-primary/20"
          >
            Start Shopping <FiArrowRight />
          </Link>
        </div>
      </div>

      {/* Grid: Our Story and Core Values */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Story Card */}
        <div className="lg:col-span-1 bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col justify-between text-left">
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
              Our Story
            </h2>
            <div className="space-y-4 text-white/50 text-sm font-body leading-relaxed">
              <p>
                Founded in 2026, SkyMart started with a simple belief: online shopping should be intuitive, incredibly fast, and free of filler catalog lists.
              </p>
              <p>
                We built relationships directly with top global brands and manufacturers to construct a streamlined catalog that puts quality, longevity, and aesthetics first.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
              SM
            </div>
            <div>
              <p className="text-white/80 font-heading font-semibold text-xs">SkyMart Team</p>
              <p className="text-white/30 text-[10px] font-body mt-0.5">Est. 2026</p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors text-left">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 shrink-0">
              <FiAward size={20} />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">
              Uncompromising Quality
            </h3>
            <p className="text-white/40 text-sm font-body leading-relaxed">
              Every single product cataloged on SkyMart goes through strict quality vetting to ensure only authentic, reliable items reach your hands.
            </p>
          </div>

          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors text-left">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-4 shrink-0">
              <FiTruck size={20} />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">
              Lightning Delivery
            </h3>
            <p className="text-white/40 text-sm font-body leading-relaxed">
              With fulfillment hubs placed across major hubs, we process orders instantly and ship them out for guaranteed near-instant delivery.
            </p>
          </div>

          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors text-left">
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 mb-4 shrink-0">
              <FiShield size={20} />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">
              Secure Operations
            </h3>
            <p className="text-white/40 text-sm font-body leading-relaxed">
              Our payment portals are fully protected with 256-bit encryption. Your details and payment processing are kept safe, secure, and private.
            </p>
          </div>

          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors text-left">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-4 shrink-0">
              <FiHeart size={20} />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">
              Customer First
            </h3>
            <p className="text-white/40 text-sm font-body leading-relaxed">
              We stand by our products with a 30-day money-back guarantee and live chat operators ready to troubleshoot and resolve issues immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 text-center">
          <p className="font-heading font-bold text-4xl sm:text-5xl text-primary">50K+</p>
          <p className="text-white/40 text-xs sm:text-sm font-body mt-2">Happy Customers</p>
        </div>
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 text-center">
          <p className="font-heading font-bold text-4xl sm:text-5xl text-white">120K+</p>
          <p className="text-white/40 text-xs sm:text-sm font-body mt-2">Packages Shipped</p>
        </div>
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 text-center">
          <p className="font-heading font-bold text-4xl sm:text-5xl text-primary">4.9★</p>
          <p className="text-white/40 text-xs sm:text-sm font-body mt-2">Store Rating</p>
        </div>
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 text-center">
          <p className="font-heading font-bold text-4xl sm:text-5xl text-white">24/7</p>
          <p className="text-white/40 text-xs sm:text-sm font-body mt-2">Live Support Desk</p>
        </div>
      </div>

      {/* Team Showcase */}
      <div className="border-t border-white/5 pt-12 mb-16">
        <div className="max-w-2xl text-left mb-10">
          <h2 className="font-heading font-bold text-3xl text-foreground">
            Meet the Pioneers
          </h2>
          <p className="text-white/40 text-sm font-body mt-2">
            The design team and dreamers behind SkyMart's premium visual design and high-tech checkout workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Member 1 */}
          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 text-center hover:border-white/10 transition-colors group">
            <div className="w-20 h-20 bg-primary/20 text-primary border border-primary/20 rounded-full flex items-center justify-center text-2xl font-bold font-heading mx-auto mb-4 group-hover:scale-105 transition-transform">
              VC
            </div>
            <h4 className="font-heading font-semibold text-base text-foreground">Vinod Chandra</h4>
            <p className="text-primary text-xs font-body mt-1">Founder & CEO</p>
            <p className="text-white/30 text-[11px] font-body mt-2 leading-relaxed">
              Driving product expansion, branding direction, and supply-chain logistics.
            </p>
          </div>

          {/* Member 2 */}
          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 text-center hover:border-white/10 transition-colors group">
            <div className="w-20 h-20 bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-full flex items-center justify-center text-2xl font-bold font-heading mx-auto mb-4 group-hover:scale-105 transition-transform">
              AS
            </div>
            <h4 className="font-heading font-semibold text-base text-foreground">Ankit Sharma</h4>
            <p className="text-blue-400 text-xs font-body mt-1">Lead Developer</p>
            <p className="text-white/30 text-[11px] font-body mt-2 leading-relaxed">
              Writing scalable systems, fast APIs, and responsive state handlers.
            </p>
          </div>

          {/* Member 3 */}
          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 text-center hover:border-white/10 transition-colors group">
            <div className="w-20 h-20 bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-full flex items-center justify-center text-2xl font-bold font-heading mx-auto mb-4 group-hover:scale-105 transition-transform">
              KD
            </div>
            <h4 className="font-heading font-semibold text-base text-foreground">Kriti Deshmukh</h4>
            <p className="text-amber-400 text-xs font-body mt-1">Creative Director</p>
            <p className="text-white/30 text-[11px] font-body mt-2 leading-relaxed">
              Shaping glassmorphic components, dark themes, and animations.
            </p>
          </div>

          {/* Member 4 */}
          <div className="bg-white/3 border border-white/5 rounded-3xl p-6 text-center hover:border-white/10 transition-colors group">
            <div className="w-20 h-20 bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-full flex items-center justify-center text-2xl font-bold font-heading mx-auto mb-4 group-hover:scale-105 transition-transform">
              SM
            </div>
            <h4 className="font-heading font-semibold text-base text-foreground">Siddharth Mehta</h4>
            <p className="text-purple-400 text-xs font-body mt-1">Head of Support</p>
            <p className="text-white/30 text-[11px] font-body mt-2 leading-relaxed">
              Ensuring 24/7 support reliability and lightning customer resolution metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Footer */}
      <div className="bg-gradient-to-r from-primary/10 to-[#111] border border-white/5 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-lg mx-auto space-y-5">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            Experience SkyMart Today
          </h3>
          <p className="text-white/50 text-sm font-body leading-relaxed">
            Thousands of products, incredible savings, and lightning-fast checkout are waiting for you right now.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-background font-bold text-xs px-6 py-3.5 rounded-xl hover:bg-volt-light transition-all cursor-pointer shadow-lg shadow-primary/10 border-none"
            >
              Browse Catalog <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;