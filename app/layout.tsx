import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const baseMetadata: Metadata = {
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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    ...baseMetadata,
    metadataBase: baseUrl,
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
}

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
