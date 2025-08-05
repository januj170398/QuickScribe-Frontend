import { Tag } from "lucide-react";

export default function TagsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
      <div className="flex flex-col items-center gap-1 text-center">
        <Tag className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight mt-4">
          Manage Tags
        </h3>
        <p className="text-sm text-muted-foreground">
          This page is under construction. Come back later to organize your notes with tags.
        </p>
      </div>
    </div>
  );
}
