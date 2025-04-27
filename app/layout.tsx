"use client";

import type React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Purrmpt</title>
        <meta name="description" content="Turn your ideas into purrfect prompts with AI." />
        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.ico" type="image/png" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/png" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="flex flex-col min-h-screen">
        <div className="bg-brand-gradient" aria-hidden="true"></div>
        <div className="dark-bg-overlay hidden dark:block" aria-hidden="true"></div>
        <div className="bg-noise-overlay" aria-hidden="true"></div>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-7xl xl:max-w-8xl w-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
                bg-white/70
                dark:bg-[#1f2937]/80
                backdrop-blur-md
                rounded-2xl
                shadow-lg
                border
                border-white/30
                dark:text-gray-100
                text-base
              "
            >
              {children}
            </motion.div>
          </main>
          {/* Footer */}
          <footer className="w-full py-6 px-4 border-t text-center shadow-inner bg-white/80 dark:bg-[#1f2937]/80 backdrop-blur-md">
            <p className="text-sm text-muted-foreground">
              Designed and developed with ❤️ by{" "}
              <a
                href="https://kevinolanday.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline transition-all"
              >
                Kevin Olanday
              </a>
              . View the project on{" "}
              <a
                href="https://github.com/kevin-olanday/purrmpt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline transition-all"
              >
                GitHub
              </a>
              .
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Header with theme toggle and matching style
function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="
        w-full
        py-4
        px-6
        flex
        items-center
        justify-between
        border-b
        bg-white/70
        dark:bg-[#1f2937]/80
        backdrop-blur-md
        border-white/30
        dark:border-gray-700
        transition-colors
        shadow-lg
      "
    >
      <div className="flex items-center gap-2">
        <div className="logo-wrapper">
          <div className="logo-masked" aria-label="Purrmpt Logo" role="img" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-whyte">Purrmpt</h1>
        <Badge variant="secondary" className="ml-2">
          v1.0.0
        </Badge>
      </div>
      {/* Theme toggle button */}
      <button
        aria-label="Toggle theme"
        className="rounded-full p-2 hover:bg-muted transition-colors"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
}