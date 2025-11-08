"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { SERVICES_DATA } from "../util/constants";
import type { Service } from "../util/types";
import ScrollAnimator from "./ScrollAnimator";

// Variantes otimizadas apenas para as animações
const cardVariants: Variants = {
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const ServiceCard: React.FC<Service> = ({ icon, title, description }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="group relative flex flex-col h-full bg-brand-gray p-8 rounded-2xl shadow-lg hover:shadow-brand-blue/20 transform transition-all duration-300 overflow-hidden border-2 border-gray-800 hover:border-brand-blue"
  >
    {/* Animated background element for hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

    {/* Main content wrapper */}
    <div className="relative z-10 flex flex-col flex-1">
      {/* Icon container */}
      <div className="relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue shadow-lg group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
        <div className="z-10">{icon}</div>
        {/* Pulsing effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-brand-blue opacity-0 group-hover:opacity-100 animate-ping" />
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        {/* Description area that grows to fill space */}
        <div className="flex-1">
          <p className="text-brand-light-gray leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative bg-brand-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full mix-blend-lighten filter blur-3xl opacity-50" />
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full mix-blend-lighten filter blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimator className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gray shadow-lg border border-gray-700 mb-6">
            <div className="w-2 h-2 bg-brand-blue rounded-full mr-2.5 animate-ping" />
            <span className="text-brand-light-gray text-sm font-semibold">Nossas Soluções</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Serviços Pensados para <span className="bg-gradient-to-r from-brand-blue to-cyan-300 bg-clip-text text-transparent">Impulsionar</span>
          </h2>
          <p className="text-lg text-brand-light-gray max-w-3xl mx-auto">
            Da estratégia à execução, oferecemos um arsenal completo de marketing digital para colocar sua marca no topo.
          </p>
        </ScrollAnimator>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {SERVICES_DATA.map((service, index) => (
            <ScrollAnimator key={service.title} className={`transition-delay-${index * 150} h-full`}>
              <ServiceCard {...service} />
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
