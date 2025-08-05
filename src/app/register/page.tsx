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
import { Feather } from "lucide-react";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    // This is a mock registration. In a real app, you'd handle user creation here.
    router.push("/notes");
  };
  
  const handleGuestLogin = () => {
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
            Let's get you set up to capture some brilliance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="John Doe" required />
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
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
            <Button variant="link" onClick={handleGuestLogin} className="p-0 h-auto">
              Login as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
