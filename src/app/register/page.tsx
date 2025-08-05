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
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isRegisterLoading, setIsRegisterLoading] = React.useState(false);
  const [isGuestLoading, setIsGuestLoading] = React.useState(false);

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    setIsRegisterLoading(true);
    // This is a mock registration. In a real app, you'd handle user creation here.
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
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Let&apos;s get you set up to capture some brilliance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="John Doe" required disabled={isRegisterLoading || isGuestLoading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isRegisterLoading || isGuestLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  disabled={isRegisterLoading || isGuestLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isRegisterLoading || isGuestLoading}>
                {isRegisterLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Create an account"
                )}
              </Button>
            </div>
          </form>
           <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="underline">
              Login
            </Link>
          </div>
           <div className="mt-2 text-center text-sm">
            <Button variant="link" onClick={handleGuestLogin} className="p-0 h-auto" disabled={isRegisterLoading || isGuestLoading}>
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
