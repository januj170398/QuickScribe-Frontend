
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Feather, Loader2 } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [isGuestLoading, setIsGuestLoading] = React.useState(false);
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoginLoading(true);
    // This is a mock login. In a real app, you'd handle authentication here.
    setTimeout(() => router.push("/notes"), 750);
  };

  const handleGuestLogin = () => {
    setIsGuestLoading(true);
    setTimeout(() => router.push("/notes"), 750);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 bg-dot-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader>
            <div className="flex justify-center mb-4">
               <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                <Feather className="h-10 w-10 text-primary" />
              </Link>
            </div>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your notes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isLoginLoading || isGuestLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required disabled={isLoginLoading || isGuestLoading} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoginLoading || isGuestLoading}>
                  {isLoginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
            <div className="mt-2 text-center text-sm">
              <Button variant="link" onClick={handleGuestLogin} className="p-0 h-auto" disabled={isGuestLoading || isLoginLoading}>
                {isGuestLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login as Guest"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
