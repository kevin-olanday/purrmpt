"use client";

import type React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Purrmpt</title>
        <meta name="description" content="Enhance your prompts into purrfectly crafted, high-impact prompts. 🐱" />
        <meta name="keywords" content="Purrmpt, AI prompts, prompt enhancer, prompt builder, AI writing, text generation, creative prompts, ChatGPT prompts, prompt crafting, AI tools, prompt generator, writing assistant, DALL-E prompts, Codex prompts, prompt optimization, free AI tool" />
        {/* Basic SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kevin Olanday" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.ico" type="image/png" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/png" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />


        {/* Open Graph */}
        <meta property="og:title" content="Purrmpt" />
        <meta property="og:description" content="Enhance your prompts into purrfectly crafted, high-impact prompts. 🐱" />
        <meta property="og:image" content="/purrmpt-og.png" />
        <meta property="og:url" content="https://purrmpt.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Purrmpt" />
        <meta name="twitter:description" content="Enhance your prompts into purrfectly crafted, high-impact prompts. 🐱" />
        <meta name="twitter:image" content="/purrmpt-og.png" />

        
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="bg-brand-gradient" aria-hidden="true"></div>
          <div className="dark-bg-overlay hidden dark:block" aria-hidden="true"></div>
          <div className="bg-noise-overlay" aria-hidden="true"></div>
          <Header />
          {/* Main Content */}
          <main role="main" className="flex-1 container mx-auto px-4 py-6 md:py-12 max-w-7xl xl:max-w-8xl w-full flex flex-col">
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
          <footer role="contentinfo" className="w-full py-6 px-4 border-t text-center shadow-inner bg-white/80 dark:bg-[#1f2937]/80 backdrop-blur-md">
            <p className="text-sm text-gray-600 dark:text-muted-foreground">
              Designed and developed with ❤️ by{" "}
              <a
                href="https://kevinolanday.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block align-middle font-semibold px-3 py-1 ml-1 rounded-full text-xs
                  bg-gray-200 text-gray-900 hover:bg-gray-300
                  dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600
                  transition-colors
                "
              >
                Kevin Olanday
              </a>
              . View the project on{" "}
              <a
                href="https://github.com/kevin-olanday/purrmpt"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block align-middle font-semibold px-3 py-1 ml-1 rounded-full text-xs
                  bg-gray-200 text-gray-900 hover:bg-gray-300
                  dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600
                  transition-colors
                "
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      role="banner"
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
      {/* Animated Theme toggle button with Tooltip */}
      {mounted && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <button
                aria-label="Toggle theme"
                className="rounded-full p-2 hover:bg-muted transition-colors"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="block"
                    >
                      <Sun className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="block"
                    >
                      <Moon className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="center"
              className="bg-gray-900 text-gray-100 border border-gray-800 rounded-md px-3 py-1.5 text-xs shadow-lg"
              sideOffset={6}
              arrowPadding={8}
            >
              Toggle Theme
              <div className="absolute left-1/2 -translate-x-1/2 -top-2">
                <svg width="12" height="6" viewBox="0 0 12 6" className="text-gray-900 dark:text-gray-900">
                  <polygon points="6,0 12,6 0,6" fill="currentColor" />
                </svg>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </header>
  );
}