
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background bg-dot-pattern">
      <header className="flex items-center justify-between p-4 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Feather className="h-6 w-6 text-primary" />
          <span className="font-bold">QuickScribe</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Capture Your Thoughts, Instantly.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            QuickScribe is a modern, minimalist, and user-friendly note-taking
            application designed for speed and simplicity. Your thoughts are waiting.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Get Started for Free</Link>
            </Button>
          </div>
        </motion.div>
      </main>

       <footer className="text-center p-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} QuickScribe. All Rights Reserved.
      </footer>
    </div>
  );
}
