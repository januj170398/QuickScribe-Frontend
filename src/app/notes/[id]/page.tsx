"use client";

import {
  ArrowLeft,
  Share,
  Tag,
  Upload,
  Sparkles,
  CheckCircle2,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Label } from "@/components/ui/label";
import { useParams } from 'next/navigation';

export default function NoteEditorPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isNewNote = id === "new";

  const [title, setTitle] = React.useState(isNewNote ? "Untitled Note" : "Project Phoenix Kickoff");
  const [content, setContent] = React.useState(isNewNote ? "" : "Meeting notes from the initial planning session for Project Phoenix. Key discussion points included budget allocation, team roles, and project timeline. Next steps are to finalize the project charter and schedule a follow-up meeting with stakeholders.");
  const [tags, setTags] = React.useState<string[]>(isNewNote ? [] : ["project", "work"]);
  const [tagInput, setTagInput] = React.useState("");
  const [syncStatus, setSyncStatus] = React.useState<"synced" | "syncing" | "dirty">("synced");

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }
  
  React.useEffect(() => {
    if (isNewNote) {
        setSyncStatus("synced");
        return;
    };
    setSyncStatus("dirty");
    const handler = setTimeout(() => {
        setSyncStatus("syncing");
        setTimeout(() => setSyncStatus("synced"), 1000);
    }, 1500);

    return () => {
        clearTimeout(handler);
    };
  }, [title, content, tags, isNewNote]);


  return (
    <div className="mx-auto grid flex-1 auto-rows-max gap-4 w-full">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/notes">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
             <Input 
                placeholder="Note Title" 
                className="text-xl font-semibold leading-none tracking-tight border-0 shadow-none focus-visible:ring-0 p-0 bg-transparent" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
        </div>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          {syncStatus === 'synced' && <div className="flex items-center gap-1 text-sm text-accent-foreground"><CheckCircle2 className="h-4 w-4 text-accent" /> Synced</div>}
          {syncStatus === 'syncing' && <div className="flex items-center gap-1 text-sm text-muted-foreground animate-pulse">Syncing...</div>}
          {syncStatus === 'dirty' && <div className="flex items-center gap-1 text-sm text-muted-foreground">Saving...</div>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
                <CardContent className="p-4 sm:p-6">
                <Textarea 
                    placeholder="Start writing your note here..." 
                    className="min-h-[60vh] border-0 shadow-none focus-visible:ring-0 p-0 text-base resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                </CardContent>
            </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tags">
                  <Tag className="h-4 w-4 inline-block mr-2" />
                  Tags
                </Label>
                <Input 
                  id="tags" 
                  placeholder="Add a tag and press Enter" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                />
                <div className="flex flex-wrap gap-1">
                    {tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-1 font-bold hover:text-destructive">&times;</button>
                        </Badge>
                    ))}
                </div>
              </div>
              <Separator />
               <div className="grid gap-3">
                <Label htmlFor="media">
                    <Upload className="h-4 w-4 inline-block mr-2" />
                    Attachments
                </Label>
                <Button variant="outline" size="sm">Upload Image/File</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Actions</CardTitle>
              <CardDescription>
                Use AI to enhance your notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button size="sm" variant="outline" className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Summarize Note
              </Button>
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
                <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" /> Share
                </Button>
                <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete Note
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
