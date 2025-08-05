"use client";

import {
  ArrowLeft,
  Share,
  Tag,
  Upload,
  Sparkles,
  CheckCircle2,
  Trash2,
  MoreVertical,
  Pencil,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { summarizeNote } from "@/ai/flows/summarizeNote";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function NoteEditorPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isNewNote = id === "new";

  const { toast } = useToast();

  const [title, setTitle] = React.useState(isNewNote ? "Untitled Note" : "Project Phoenix Kickoff");
  const [content, setContent] = React.useState(isNewNote ? "" : "Meeting notes from the initial planning session for Project Phoenix. Key discussion points included budget allocation, team roles, and project timeline. Next steps are to finalize the project charter and schedule a follow-up meeting with stakeholders.");
  const [tags, setTags] = React.useState<string[]>(isNewNote ? [] : ["project", "work"]);
  const [tagInput, setTagInput] = React.useState("");
  const [syncStatus, setSyncStatus] = React.useState<"synced" | "syncing" | "dirty">("synced");

  const [isSummaryLoading, setIsSummaryLoading] = React.useState(false);
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = React.useState(false);


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

  const handleAiOverview = async () => {
    if (!content) {
        toast({
            variant: "destructive",
            title: "Cannot generate overview",
            description: "There is no content to summarize.",
        });
        return;
    }
    setIsSummaryLoading(true);
    try {
      const result = await summarizeNote({ content });
      setSummary(result.summary);
      setIsSummaryDialogOpen(true);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "AI Overview Failed",
        description: "We couldn't generate a summary for this note. Please try again.",
      });
      console.error("AI Overview error:", error);
    } finally {
      setIsSummaryLoading(false);
    }
  }


  return (
    <>
    <div className="flex flex-col h-full bg-card text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="/notes">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {syncStatus === 'synced' && <><CheckCircle2 className="h-4 w-4" /> Synced</>}
                {syncStatus === 'syncing' && <div className="flex items-center gap-1 text-sm text-muted-foreground animate-pulse">Syncing...</div>}
                {syncStatus === 'dirty' && <div className="flex items-center gap-1 text-sm text-muted-foreground">Saving...</div>}
            </div>
        </div>
        
        <div className="flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share className="h-4 w-4 mr-2" /> Share
              </DropdownMenuItem>
               <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" /> Attachments
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem onClick={handleAiOverview} disabled={isSummaryLoading}>
                {isSummaryLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                 AI Overview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" /> Improve Writing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                 <Link href="/tags" className="w-full">
                    <Tag className="h-4 w-4 mr-2" /> Manage Tags
                 </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Input 
              placeholder="Note Title" 
              className="text-4xl font-bold tracking-tight border-0 shadow-none focus-visible:ring-0 p-0 mb-6 bg-transparent" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
           <Textarea 
              placeholder="Start writing your masterpiece here..." 
              className="min-h-[calc(100vh-280px)] w-full max-w-4xl mx-auto border-0 shadow-none focus-visible:ring-0 p-0 text-lg resize-none bg-transparent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
          />
      </main>
        <footer className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-normal text-sm">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1.5 font-bold hover:text-destructive text-base leading-none translate-y-[-1px]">&times;</button>
                    </Badge>
                ))}
            </div>
            <Input 
                className="h-8 flex-1 bg-transparent border-0 focus-visible:ring-0 shadow-none p-0 text-sm"
                placeholder="Add a tag..." 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
            />
            </div>
        </footer>
    </div>
    <Dialog open={isSummaryDialogOpen} onOpenChange={setIsSummaryDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span>AI Overview</span>
                    </div>
                </DialogTitle>
                <DialogDescription className="pt-4 text-foreground text-base leading-relaxed">
                   {summary}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    </>
  );
}
