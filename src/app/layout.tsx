"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "../utils/ThemeProvider";
import { Toaster } from "sonner";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import { FC, useEffect } from "react";
import { socketId } from "@/utils/socket";
import { StreamProvider } from "@/utils/StreamContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-800 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SocketProvider>
                <StreamProvider>
                {children}
                <Toaster position="top-center" />
                </StreamProvider>
              </SocketProvider>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const SocketProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);
  return <>{children}</>;
};