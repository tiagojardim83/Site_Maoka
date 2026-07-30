import type { Metadata, Viewport } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://maoka-cenografia.lobs83.chatgpt.site";
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
    icon: `${basePath}/favicon.png`,
    shortcut: `${basePath}/favicon.png`,
    apple: `${basePath}/favicon.png`,
  },
  alternates: { canonical: baseUrl },
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
  themeColor: "#ff311f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
