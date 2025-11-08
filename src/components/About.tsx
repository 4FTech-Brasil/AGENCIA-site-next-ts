import React from "react";
import ScrollAnimator from "./ScrollAnimator";

const About: React.FC = () => {
  const keyPoints = [
    { title: "Parceria Estratégica", description: "Atuamos como uma extensão do seu time." },
    { title: "Resultados Mensuráveis", description: "Foco total em métricas que importam para o seu ROI." },
    { title: "Inovação Constante", description: "Antenados nas últimas tendências para manter sua marca à frente." },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Elemento gráfico como background no mobile */}
      <div className="md:hidden absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-800/30 rounded-2xl transform rotate-3"></div>

        {/* Glassmorphism card de fundo */}
        <div className="absolute top-1/2 left-1/2 w-80 h-52 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 transform -translate-x-1/2 -translate-y-1/2 -rotate-6 shadow-lg opacity-40">
          <div className="p-4">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 bg-gray-400/50 rounded-full" />
              <div className="w-3 h-3 bg-gray-400/50 rounded-full" />
              <div className="w-3 h-3 bg-gray-400/50 rounded-full" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded animate-pulse" />
              <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Orbs de fundo */}
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"></div>
      </div>

      {/* Background Animated Elements - apenas desktop */}
      <div className="hidden md:block absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
      <div className="hidden md:block absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimator>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Conteúdo textual - ocupa 100% no mobile */}
            <div className="md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Sobre a <span className="text-blue-500">4FTech</span>
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Somos mais que uma agência de marketing digital; somos parceiros estratégicos no crescimento do seu negócio. Nascemos da paixão por
                tecnologia e da vontade de transformar a presença online de empresas no Brasil.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Nosso time é formado por especialistas em mídias sociais, tráfego pago e estratégias de growth, sempre focados em entregar resultados
                mensuráveis e impactantes.
              </p>

              <div className="space-y-6 border-l-4 border-blue-500/50 pl-6">
                {keyPoints.map((point) => (
                  <div key={point.title}>
                    <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                    <p className="text-gray-400">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Elemento gráfico - apenas desktop */}
            <div className="hidden md:flex md:order-2 h-[28rem] items-center justify-center">
              <div className="relative w-full max-w-md h-full">
                {/* Base Shape */}
                <div className="absolute inset-0 bg-gray-800/50 rounded-2xl shadow-2xl transform rotate-6"></div>

                {/* Glassmorphism card */}
                <div className="absolute top-1/2 left-1/2 w-80 h-52 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 shadow-lg">
                  <div className="p-4">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 bg-gray-400/50 rounded-full" />
                      <div className="w-3 h-3 bg-gray-400/50 rounded-full" />
                      <div className="w-3 h-3 bg-gray-400/50 rounded-full" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Blue Orb */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>

                {/* Cyan Orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/15 rounded-full blur-2xl"></div>

                {/* Floating squares */}
                <div className="absolute top-10 left-5 w-8 h-8 border-2 border-blue-500/50 rounded-lg transform rotate-45"></div>
                <div className="absolute bottom-10 right-5 w-12 h-12 bg-white/5 rounded-lg transform -rotate-12"></div>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
};

export default About;
