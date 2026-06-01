import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vantage Pest Services",
  description:
    "Precision pest control for homes that matter. Licensed technicians, discreet service, guaranteed results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} font-sans antialiased bg-zinc-50 text-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
