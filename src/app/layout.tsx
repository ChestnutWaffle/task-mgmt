import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Sign In and create tasks to keep track of them",
  icons: {
    icon: "/task.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" className="bg-gray-900 text-slate-200">
        <body className={`${inter.className} flex flex-col`}>
          <NavBar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
