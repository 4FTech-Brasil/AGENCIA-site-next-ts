import React from 'react';
import type { NavLink, Service, ProcessStep, SocialLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Sobre', href: '#about' },
  { name: 'Serviços', href: '#services' },
  { name: 'Processo', href: '#portfolio' },
  { name: 'Contato', href: '#contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Área restrita', href: '/admin' },
];

export const SERVICES_DATA: Service[] = [
  {
    title: 'Gestão de Mídias Sociais',
    description: 'Criamos e gerenciamos conteúdo estratégico para engajar seu público, fortalecer sua marca e gerar resultados reais nas principais redes sociais.',
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), React.createElement('circle', { cx: "9", cy: "7", r: "4" }), React.createElement('path', { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), React.createElement('path', { d: "M16 3.13a4 4 0 0 1 0 7.75" }))
  },
  {
    title: 'Anúncios Online (Tráfego Pago)',
    description: 'Planejamos e executamos campanhas de anúncios de alta performance no Google, Instagram, Facebook e LinkedIn para atrair clientes qualificados.',
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('line', { x1: "12", x2: "12", y1: "20", y2: "10" }), React.createElement('line', { x1: "18", x2: "18", y1: "20", y2: "4" }), React.createElement('line', { x1: "6", x2: "6", y1: "20", y2: "16" }))
  },
  {
    title: 'Captação de Conteúdo',
    description: 'Produzimos fotos e vídeos profissionais que contam a história da sua marca, criando material autêntico e de alta qualidade para suas redes sociais.',
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
      React.createElement('rect', { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
      React.createElement('circle', { cx: "8.5", cy: "8.5", r: "1.5" }),
      React.createElement('polyline', { points: "21 15 16 10 5 21" })
    )
  },
  //{
  //title: 'Estratégias de Crescimento',
  //description: 'Desenvolvemos planos de marketing digital completos e personalizados, focados em growth hacking e otimização de conversão para acelerar seu negócio.',
  //icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.09-3.1a2 2 0 0 0-2.43-2.43c-.81.61-2.26.62-3.1.09z" }), React.createElement('path', { d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" }), React.createElement('path', { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }), React.createElement('path', { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }))
  //},
  {
    title: 'Desenvolvimento Web',
    description: 'Construímos sites e landing pages modernos, responsivos e otimizados para conversão, proporcionando a melhor experiência para o seu usuário.',
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('polyline', { points: "16 18 22 12 16 6" }), React.createElement('polyline', { points: "8 6 2 12 8 18" }))
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('circle', { cx: "11", cy: "11", r: "8" }), React.createElement('path', { d: "m21 21-4.3-4.3" })),
    title: "Discovery e Estratégia",
    description: "Mergulhamos no seu negócio para entender seus desafios e objetivos, traçando um plano de marketing digital 100% personalizado."
  },
  {
    number: 2,
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "m12 14 4-4" }), React.createElement('path', { d: "M3.34 19a10 10 0 1 1 17.32 0" })),
    title: "Execução Criativa",
    description: "Colocamos a mão na massa com criatividade e tecnologia, criando campanhas, conteúdos e anúncios que capturam a atenção e gerem conversões."
  },
  {
    number: 3,
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M22 12h-4l-3 9L9 3l-3 9H2" })),
    title: "Análise e Otimização",
    description: "Monitoramos os resultados em tempo real, analisando dados para otimizar continuamente as estratégias e maximizar seu ROI."
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', initial: 'I', href: 'https://www.instagram.com/4ftech/' },
  { name: 'Facebook', initial: 'F', href: 'https://www.facebook.com/profile.php?id=61556419645060' },
  { name: 'LinkedIn', initial: 'L', href: 'https://www.linkedin.com/company/4ftech/' },
];