import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.svg";
import { FiFacebook, FiTwitter, FiInstagram, FiGithub, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#09090b] border-t border-white/10 text-white/60 text-sm font-body mt-auto">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand & Slogan */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <img src={logo} alt="logo" />
            </div>
            <span className="font-heading text-foreground font-bold text-lg text-white">
              Sky<span className="text-primary">Mart</span>
            </span>
          </div>
          <p className="text-white/40 text-xs leading-relaxed max-w-xs">
            Experience premium online shopping. Curated electronics, fashion, beauty, and decor delivered straight to your door with lightning speed.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 bg-white/5 hover:bg-primary hover:text-background border border-white/5 rounded-xl transition-all">
              <FiFacebook size={16} />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-primary hover:text-background border border-white/5 rounded-xl transition-all">
              <FiTwitter size={16} />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-primary hover:text-background border border-white/5 rounded-xl transition-all">
              <FiInstagram size={16} />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-primary hover:text-background border border-white/5 rounded-xl transition-all">
              <FiGithub size={16} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3 text-left">
          <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
            Shop Catalog
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products?category=laptops" className="hover:text-primary transition-colors">
                Laptops & Tech
              </Link>
            </li>
            <li>
              <Link to="/products?category=beauty" className="hover:text-primary transition-colors">
                Beauty & Fragrance
              </Link>
            </li>
            <li>
              <Link to="/products?category=furniture" className="hover:text-primary transition-colors">
                Furniture & Decor
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors">
                All Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Corporate Info */}
        <div className="space-y-3 text-left">
          <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
            SkyMart Corp
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Store Locations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy & Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Signup */}
        <div className="space-y-3 text-left">
          <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-white/40 text-xs leading-relaxed">
            Subscribe to receive flash sales, exclusive discounts, and product alerts.
          </p>
          <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-3 pr-10 outline-none text-white text-xs focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-background p-1.5 rounded-lg hover:bg-volt-light transition-colors cursor-pointer border-none"
            >
              <FiMail size={12} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-white/5 bg-[#060608] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-white/30">
            &copy; 2026 SkyMart Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
