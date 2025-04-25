import type { Metadata } from "next";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

// app/layout.tsx
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'SafeSpeak',
  description: 'Voice verification you can trust',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.variable}>
        <body className="relative min-h-screen bg-gradient-to-b from-[#0064BB] to-[#0081CC] px-4 py-8 md:py-16">
          <SignedIn>
            <div className="absolute top-4 right-4 z-50">
              <UserButton />
            </div>
          </SignedIn>

          <div className="flex justify-center items-center">
            <div className="z-50 flex flex-col items-center">
              <SignedOut>
                <div className="container mx-auto max-w-7xl">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col gap-2 mb-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                          SafeSpeak
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 tracking-wider font-medium">
                          SAY IT SAFE
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
                  <h2 className="text-2xl font-semibold text-center text-white mb-8">
                    Please Sign In or Sign Up
                  </h2>
                  <div className="flex flex-col items-center gap-4">
                    <SignInButton>
                      <button className="w-full bg-white/90 hover:bg-white text-[#0064BB] py-3 px-6 rounded-xl text-lg font-semibold transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="w-full bg-white/90 hover:bg-white text-[#0064BB] py-3 px-6 rounded-xl text-lg font-semibold transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </div>
              </SignedOut>
            </div>
          </div>

          {/* Main content */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}