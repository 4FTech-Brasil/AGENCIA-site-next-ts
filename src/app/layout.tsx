import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#1e1e1e",
};

export const metadata: Metadata = {
  title: {
    default: "4FTech - Marketing Digital | Gestão de Mídias Sociais & Tráfego Pago",
    template: "%s | 4FTech",
  },
  description:
    "marketing digital especializada em gestão de mídias sociais, tráfego pago, captação de conteúdo e desenvolvimento web. Resultados mensuráveis para seu negócio.",
  keywords: [
    "marketing digital",
    "agência digital",
    "gestão de mídias sociais",
    "tráfego pago",
    "Google Ads",
    "Facebook Ads",
    "criação de sites",
    "desenvolvimento web",
    "captação de conteúdo",
    "fotografia",
    "vídeos",
    "4FTech",
  ],
  authors: [{ name: "4FTech" }],
  creator: "4FTech",
  publisher: "4FTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://4ftech.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://4ftech.com.br",
    title: "4FTech - Marketing Digital",
    description: "Elevamos sua marca no mundo digital com estratégias de marketing que conectam, engajam e convertem.",
    siteName: "4FTech",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "4FTech - Marketing Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4FTech - Marketing Digital",
    description: "Estratégias de marketing digital que conectam, engajam e convertem.",
    images: ["/twitter-image.jpg"],
    creator: "@4ftech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Adicione aqui quando tiver
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "marketing digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect para melhor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        <meta name="theme-color" content="#1e1e1e" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Dados estruturados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DigitalMarketingService",
              name: "4FTech - Marketing Digital",
              description: "marketing digital especializada em gestão de mídias sociais, tráfego pago, captação de conteúdo e desenvolvimento web.",
              url: "https://4ftech.com.br",
              telephone: "+55-11-99464-0400",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BR",
              },
              serviceType: ["Gestão de Mídias Sociais", "Tráfego Pago", "Captação de Conteúdo", "Estratégias de Crescimento", "Desenvolvimento Web"],
              areaServed: "Brasil",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-gray-900 text-white font-sans overflow-x-hidden`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
