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

export default function LoginPage() {
  const router = useRouter();
  const [isGuestLoading, setIsGuestLoading] = React.useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // This is a mock login. In a real app, you'd handle authentication here.
    router.push("/notes");
  };

  const handleGuestLogin = () => {
    setIsGuestLoading(true);
    router.push("/notes");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Feather className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">QuickScribe</CardTitle>
          <CardDescription className="text-center">
            Your thoughts are waiting. Let&apos;s get them on the page.
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
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
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
            <Button variant="link" onClick={handleGuestLogin} className="p-0 h-auto" disabled={isGuestLoading}>
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
    </div>
  );
}
