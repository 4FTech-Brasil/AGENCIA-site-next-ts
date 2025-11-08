"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Mouse move effect for parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate floating particles after mount using setTimeout
    const particleTimer = setTimeout(() => {
      const generatedParticles = Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
      }));
      setParticles(generatedParticles);
      setIsMounted(true);
    }, 0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(particleTimer);
    };
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
  };

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-6 py-6 text-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl opacity-50 transition-transform duration-200"
        style={parallaxStyle}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl opacity-50 transition-transform duration-200"
        style={{
          transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-brand-blue/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.speed * 10}s ease-in-out ${index * 0.5}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl">
        {/* Animated 404 Number */}
        <div className="my-8 relative">
          <div className="text-8xl md:text-[12rem] font-bold text-white mb-4 relative">
            <span className="bg-gradient-to-r from-brand-blue to-cyan-400 bg-clip-text text-transparent relative z-10">404</span>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-cyan-400 blur-xl opacity-20 scale-110" />
          </div>

          {/* Floating elements around 404 */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-brand-blue/50 rounded-lg transform rotate-45 animate-float-3d" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/5 rounded-lg transform -rotate-12 animate-float-3d-delayed" />
        </div>

        {/* Message Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Página Não Encontrada</h2>
          <p className="text-brand-light-gray text-lg md:text-xl leading-relaxed max-w-md mx-auto">
            Ops! A página que você está procurando não existe ou foi movida.
            <br />
            Vamos te ajudar a voltar ao caminho certo.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="group relative bg-brand-blue text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-brand-blue/25 flex items-center space-x-2 min-w-[200px] justify-center overflow-hidden"
          >
            {/* Hover effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="relative z-10">Voltar ao Início</span>
          </Link>

          <button
            onClick={handleGoBack}
            className="group relative bg-brand-gray text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg border border-gray-700 hover:border-brand-blue/50 flex items-center space-x-2 min-w-[200px] justify-center overflow-hidden"
          >
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span className="relative z-10">Página Anterior</span>
          </button>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-brand-light-gray mb-4">Precisa de ajuda ou não encontrou o que procura?</p>
          <Link
            href="https://api.whatsapp.com/send?phone=5511994640400&text=Olá!%20Preciso%20de%20ajuda%20com%20o%20site%204FTech."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-brand-blue hover:text-cyan-400 transition-colors duration-300 font-semibold group"
          >
            <span>Fale conosco pelo WhatsApp</span>
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0.16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.176-1.24-6.165-3.495-8.411" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Add CSS animations to global CSS or use a style tag */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-3d {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg) scale(1);
          }
          50% {
            transform: translateY(-15px) rotate(45deg) scale(1.1);
          }
        }

        @keyframes float-3d-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(-12deg) scale(1);
          }
          50% {
            transform: translateY(-10px) rotate(-12deg) scale(1.05);
          }
        }

        .animate-float-3d {
          animation: float-3d 4s ease-in-out infinite;
        }

        .animate-float-3d-delayed {
          animation: float-3d-delayed 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
