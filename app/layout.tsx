import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Roadmap from "@/components/Roadmap";
import Quiz from "@/components/Quiz";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guide-books.vercel.app"),
  title: "GuideBooks",
  description: "Browse through the current tech industry's stack and quiz your knowledge. Includes roadmaps for Frontend, Backend, and Full-Stack developers.",
  openGraph: {
    title: "GuideBooks",
    description: "Browse through the current tech industry's stack and quiz your knowledge. Includes roadmaps for Frontend, Backend, and Full-Stack developers.",
    url: "/",
    siteName: "GuideBooks",
    type: "website",
  },
};

// Wraps every page. The main panel changes as you navigate; Quiz and Roadmap stay on screen.
export default function RootLayout({ children }: LayoutProps<"/">) { 
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[url('/images/background.jpeg')] bg-cover bg-center bg-fixed p-4 text-base text-slate-800 md:p-6">
        <div className="mx-auto max-w-6xl">
          {/* Page content and Quiz, stacked on phones and side by side on wider screens */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            {/* Shows whichever page matches the URL (home, category, topic, lesson) */}
            <div className="h-[55vh] flex-1 overflow-y-auto rounded-3xl border border-white/70 bg-[var(--panel)] p-5 shadow-lg backdrop-blur-md md:h-[50vh] md:p-6">
              {children}
            </div>
            <aside className="h-[45vh] overflow-y-auto rounded-3xl border border-white/70 bg-[var(--panel)] p-5 shadow-lg backdrop-blur-md md:h-[50vh] md:w-96 md:p-6">
              <Quiz />
            </aside>
          </div>

          {/* Career roadmaps */}
          <div className="mt-4 h-[45vh] overflow-y-auto rounded-3xl border border-white/70 bg-[var(--panel)] p-5 shadow-lg backdrop-blur-md md:mt-6 md:p-6">
            <Roadmap />
          </div>
        </div>
      </body>
    </html>
  );
}
