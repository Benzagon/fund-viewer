import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import './globalicon.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "BLC Capital",
  description: "BLC Capital - Fund analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${poppins.variable} bg-fund-bg-default font-poppins`}>{children}</body>
    </html>
  );
}
