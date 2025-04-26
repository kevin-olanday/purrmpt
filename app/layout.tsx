import type React from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";

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
        <link
          rel="icon"
          href="/favicon/favicon.ico"
          type="image/png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon/favicon.ico"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}