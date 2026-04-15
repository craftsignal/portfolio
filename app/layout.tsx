import type { Metadata } from "next";
import "./globals.css";

const googleFontsHref =
  "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@1,500;1,600&family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Instrument+Sans:ital,wght@0,400;0,600;1,400;1,600&family=Instrument+Serif:ital,wght@0,400;1,400&family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap";

export const metadata: Metadata = {
  title: "Tian — Senior AI Product Designer",
  description:
    "Senior AI Product designer in the SF Bay Area — product design, systems, and prototyping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={googleFontsHref} rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
