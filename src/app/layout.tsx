import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/Layout/LeftSidebar";
import { RightSidebar } from "@/components/Layout/RightSidebar";

import { Background } from "@/components/Background";
import { Preloader } from "@/components/Preloader";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "A highly performant developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <Background />
          <Header />
          <LeftSidebar />
          <RightSidebar />
          <div className="flex flex-col min-h-screen mx-auto w-full max-w-[1600px] px-6 md:px-24 lg:px-36">
            <main className="flex-grow">{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
