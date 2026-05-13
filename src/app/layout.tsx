import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/app/components/Toast";

export const metadata: Metadata = {
  title: "Smart Family Pantry",
  description: "Your household's digital kitchen board.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background min-h-screen flex flex-col font-body-md text-on-background bg-dot-pattern">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
