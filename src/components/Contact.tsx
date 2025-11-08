import React from "react";
import ScrollAnimator from "./ScrollAnimator";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-brand-blue via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-white/20 rounded-full animate-float-8s" />
        <div className="absolute top-20 right-20 w-2 h-2 bg-cyan-300/30 rounded-full animate-float-6s" />
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-white/10 rounded-full animate-float-4s" />
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-cyan-300/20 rounded-full animate-float-8s" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/15 rounded-full animate-float-6s" style={{ animationDelay: "0.5s" }} />

        {/* Pulsing Orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,white_25px,transparent_26px),linear-gradient(transparent_24px,white_25px,transparent_26px)] bg-[size:50px_50px] animate-grid-flow" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator>
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-cyan-100 text-sm font-semibold">Vamos Começar?</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Pronto para <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Elevar sua marca?</span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Fale com um de nossos especialistas e descubra como podemos impulsionar o crescimento do seu negócio com estratégias de marketing
              digital de alta performance.
            </p>
          </div>
        </ScrollAnimator>

        {/* CTA Button */}
        <ScrollAnimator className="flex justify-center items-center mb-16">
          <a
            href="https://api.whatsapp.com/send?phone=5511976255274&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%204FTech."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white text-brand-blue px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 shadow-lg hover:scale-105 min-w-[280px] text-center overflow-hidden hover:shadow-blue-500/20 hover:shadow-2xl"
          >
            {/* Efeito de brilho que se move */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <span className="relative z-10">Falar com Especialista</span>

            {/* Linha inferior animada */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100" />
          </a>
        </ScrollAnimator>

        {/* Trust Indicators */}
        <ScrollAnimator>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {["Resultados Comprovados", "Clientes Satisfeitos", "Estratégia Personalizada", "Suporte Dedicado"].map((text, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-blue-100">
                <span className="text-sm font-medium text-center">{text}</span>
              </div>
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
};

export default Contact;
