import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import BackToTop from "@/components/BackToTop/BackToTop";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://your-rentalcar-domain.com"
  ),
  title: {
    default: "RentalCar – Reliable Car Rentals",
    template: "%s | RentalCar",
  },
  description: "RentalCar – reliable and budget-friendly car rentals for any journey. Find your perfect rental car today.",
  keywords: ["car rental", "rent a car", "vehicle rental", "affordable car rental", "budget car rental"],
  authors: [{ name: "Iryna Buhela" }],
  creator: "Iryna Buhela",
  publisher: "RentalCar",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "RentalCar – Find Your Perfect Rental Car",
    description: "Find your perfect rental car for any journey. Reliable and budget-friendly rentals.",
    siteName: "RentalCar",
    url: "/",
    images: [
      {
        url: "/img/hero/hero.png",
        width: 1200,
        height: 630,
        alt: "RentalCar - Car Rental Service",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RentalCar – Reliable Car Rentals",
    description: "Find your perfect rental car for any journey",
    images: ["/img/hero/hero.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.variable}>
        <ReactQueryProvider>
          <Header />
          {children}
          <BackToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#fff",
                color: "#121417",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                fontFamily: "var(--font-manrope)",
              },
              success: {
                iconTheme: {
                  primary: "#3470ff",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#f43f5e",
                  secondary: "#fff",
                },
              },
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
