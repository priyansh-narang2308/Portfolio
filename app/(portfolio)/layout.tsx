import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { SanityLive } from "@/sanity/lib/live";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarToggle from "@/components/sidebar-toggle";
import Script from "next/script";
import { FloatingDock } from "@/components/floating-dock";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

const atkins = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Priyansh Narang",
  description: "An AI Portfolio generated using OpenAI's agentkit and chatkit",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const isAuthenticated = !!userId;

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={atkins.className} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Script
              src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
              strategy="afterInteractive"
            />

            <SidebarProvider defaultOpen={false}>
              <SidebarInset>{children}</SidebarInset>

              {isAuthenticated && <AppSidebar side="right" />}

              <FloatingDock />
              <SidebarToggle />

              <div className="fixed top-4 left-4 md:bottom-6 md:right-24 md:top-auto md:left-auto z-40">
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <ModeToggle />
                </div>
              </div>
            </SidebarProvider>

            <SanityLive />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
