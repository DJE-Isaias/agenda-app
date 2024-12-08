import Header from "@/components/Header";
import "./globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Agenda App",
  description: "Una aplicación de agenda simple.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-800">
        <ToastContainer />
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
