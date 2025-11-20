import type { Metadata } from "next";
import "./globals.css";
import Topbar from "../components/Topbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "Eterna — Pulse Clone",
  description: "Pulse-like UI demo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Topbar />
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
