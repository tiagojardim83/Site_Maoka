import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const botanica = localFont({
  src: [
    {
      path: "./fonts/Botanica_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Botanica_Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Botanica_Semi Bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-botanica",
  display: "swap",
});

const monument = localFont({
  src: [
    {
      path: "./fonts/PPMonumentExtended-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPMonumentExtended-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PPMonumentExtended-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/PPMonumentExtended-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-monument",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://maoka-cenografia.vercel.app";
const baseUrl = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
const socialImage = new URL("og.png", baseUrl).toString();

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Maoka — Cenografia & Experiência",
    template: "%s | Maoka",
  },
  description:
    "Cenografia, arquitetura e experiências de marca. Projetos autorais de ponta a ponta para eventos, ativações e ambientes corporativos.",
  keywords: [
    "cenografia",
    "arquitetura de eventos",
    "experiência de marca",
    "ativação de marca",
    "Maoka",
  ],
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
  alternates: { canonical: baseUrl.toString() },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: "Maoka Cenografia",
    title: "Maoka — Cenografia & Experiência",
    description:
      "Ideias viram espaço. Espaços viram experiência. Conheça os projetos da Maoka.",
    images: [
      {
        url: socialImage,
        width: 1731,
        height: 909,
        alt: "Maoka — ideias viram espaço, espaços viram experiência",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maoka — Cenografia & Experiência",
    description: "Ideias viram espaço. Espaços viram experiência.",
    images: [socialImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#e51100",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${botanica.variable} ${monument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
