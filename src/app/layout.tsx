import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });
const instrument = Instrument_Serif({ weight: "400", subsets: ["latin"], style: ["normal", "italic"], variable: "--font-instrument" });

export const metadata: Metadata = {
  title: 'Ansh Singh — Software Engineer · AI/ML',
  description: 'Software engineer specializing in AI/ML, scalable backend systems, and cross-platform applications. CS student at JUIT. Open to full-time roles and internships.',
  openGraph: {
    title: 'Ansh Singh — Portfolio',
    description: 'Software engineer specializing in AI/ML, scalable backend systems, and cross-platform applications. CS student at JUIT. Open to full-time roles and internships.',
    url: 'https://anshsingh.dev',
    siteName: 'Ansh Singh',
    type: 'website',
  },
  twitter: { 
    card: 'summary_large_image', 
    title: 'Ansh Singh — Software Engineer', 
    description: 'Software engineer specializing in AI/ML, scalable backend systems, and cross-platform applications.' 
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://anshsingh.dev'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrument.variable}`}>
      <body className="font-body bg-background text-text-primary selection:bg-accent-primary/30 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
