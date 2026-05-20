import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurea Curation | Alchemical Cosmetics & Radiant Complexion Artistry",
  description: "Formulated with volcanic Obsidian Nectar and active peptides. Experience visual silence, refractive shading, and bespoke custom palette art.",
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
