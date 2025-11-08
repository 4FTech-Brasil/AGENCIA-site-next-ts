"use client";
import React from "react";
import { SOCIAL_LINKS, NAV_LINKS } from "../util/constants";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith("#")) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-brand-gray border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:text-left">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2">
            <button onClick={() => handleSmoothScroll("#home")} className="inline-block mb-4 text-left">
              <span className="text-3xl font-bold text-brand-blue hover:opacity-80 transition-opacity">4FTech</span>
            </button>
            <p className="text-brand-light-gray max-w-sm mx-auto md:mx-0 mb-6">Estratégias de marketing digital que conectam, engajam e convertem.</p>
            <p className="text-sm text-gray-500">&copy; {currentYear} 4FTech. Todos os direitos reservados.</p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Navegação</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(link.href);
                    }}
                    className="text-brand-light-gray hover:text-brand-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Redes Sociais</h4>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-light-gray hover:text-brand-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
