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
      className={`${geistSans.variable} ${geistMono.variable} text-[13px] h-full antialiased`}
    >
      <body className="min-h-screen bg-[url('/images/background.jpeg')] bg-cover bg-center bg-fixed p-6 text-slate-800">
      <div className="max-w-6xl mx-auto">
          {/* Page content and Quiz, stacked on phones and side by side on wider screens */}
          <div className="flex flex-col gap-6 md:flex-row ">
            {/* Shows whichever page matches the URL (home, category, topic, lesson) */}
            <div className="h-[50vh] flex-1 overflow-y-auto rounded-3xl bg-white/70 p-6 shadow-lg">
              {children}
            </div>
            <aside className="h-[50vh] overflow-y-auto rounded-3xl bg-white/70 p-6 shadow-lg md:w-96">
              <Quiz />
            </aside>
          </div>

          {/* Career roadmaps */}
          <div className="mt-6 h-[45vh] overflow-y-auto rounded-3xl bg-white/70 p-6 shadow-lg">
            <Roadmap />
          </div>
        </div>
        </body>
    </html>
  );
}
