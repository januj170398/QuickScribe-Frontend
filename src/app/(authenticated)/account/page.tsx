import { User } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
      <div className="flex flex-col items-center gap-1 text-center">
        <User className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight mt-4">
          Account Settings
        </h3>
        <p className="text-sm text-muted-foreground">
          This page is under construction. Manage your account settings here soon.
        </p>
      </div>
    </div>
  );
}
