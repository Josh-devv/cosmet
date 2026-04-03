import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solaire Cosmetics | A Ritual of Pure Radiance",
  description: "Experience the ultimate botanical skincare ritual with Solaire Cosmetics. Meticulously crafted for your most radiant skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags can be added here */}
      </head>
      <body>
        <div id="layout-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
