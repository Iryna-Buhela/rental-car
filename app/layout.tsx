import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "RentalCar",
  description: "RentalCar – reliable and budget-friendly car rentals",
  openGraph: {
    title: "RentalCar",
    description: "Find your perfect rental car for any journey",
    url: "https://your-rentalcar-domain.com",
    images: [
      {
        url: "/img/hero/hero.png",
        width: 1200,
        height: 630,
        alt: "RentalCar",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Header />
        {children}
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
      </body>
    </html>
  );
}
