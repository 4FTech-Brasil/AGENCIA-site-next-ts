"use client";
import React from "react";
import { PROCESS_STEPS } from "../util/constants";
import ScrollAnimator from "./ScrollAnimator";

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-brand-gray relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl animate-orb-float opacity-50" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-orb-float-delayed opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <ScrollAnimator className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-dark shadow-lg border border-gray-700 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-brand-blue mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span className="text-brand-light-gray text-sm font-semibold">Nosso Processo</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Como Transformamos{" "}
            <span className="bg-gradient-to-r from-brand-blue to-cyan-400 bg-clip-text text-transparent">Ideias em Resultados</span>
          </h2>

          <p className="text-xl text-brand-light-gray max-w-3xl mx-auto">
            Nosso método é simples, transparente e focado em performance. Em três passos, levamos sua marca ao próximo nível.
          </p>
        </ScrollAnimator>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 w-full h-0.5">
            <svg width="100%" height="2" preserveAspectRatio="none">
              <line x1="15%" y1="1" x2="85%" y2="1" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="8 8" />
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "rgba(0, 169, 231, 0)" }} />
                  <stop offset="50%" style={{ stopColor: "rgba(0, 169, 231, 0.5)" }} />
                  <stop offset="100%" style={{ stopColor: "rgba(0, 169, 231, 0)" }} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {PROCESS_STEPS.map((step, index) => (
            <ScrollAnimator key={step.number} className={`transition-delay-${index * 200}`}>
              <div className="relative text-center flex flex-col items-center">
                {/* Step Number & Icon */}
                <div className="relative mb-8 z-10">
                  <div className="w-24 h-24 rounded-2xl bg-brand-gray border-2 border-gray-700 shadow-lg flex items-center justify-center relative mx-auto">
                    {/* Icon Container */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center shadow-xl text-white">
                      {step.icon}
                    </div>

                    {/* Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-dark border-2 border-brand-blue rounded-full flex items-center justify-center shadow-md">
                      <span className="text-sm font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-brand-gray border border-gray-800 rounded-xl p-6 shadow-md max-w-sm">
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>

                  <p className="text-brand-light-gray leading-relaxed">{step.description}</p>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
