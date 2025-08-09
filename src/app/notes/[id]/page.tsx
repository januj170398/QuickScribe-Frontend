
"use client";

import {
  ArrowLeft,
  Share,
  Tag,
  Upload,
  CheckCircle2,
  Trash2,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useParams, useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Editor from "@/components/ui/editor";
import { useNotesStore, Note } from '@/lib/store';
import { useDebouncedCallback } from "use-debounce";


export default function NoteEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const isNewNote = id === "new";

  const { getNote, addNote, updateNote, deleteNote } = useNotesStore();

  const [note, setNote] = React.useState<Note | undefined>(undefined);
  const [syncStatus, setSyncStatus] = React.useState<"synced" | "syncing" | "dirty">("synced");
  const [tagInput, setTagInput] = React.useState("");

  React.useEffect(() => {
    if (!isNewNote) {
      const existingNote = getNote(id);
      if (existingNote) {
        setNote(existingNote);
      } else {
        // handle case where note with ID doesn't exist
        router.push('/notes');
      }
    } else {
      setNote({
        id: '', // Temporary ID, will be set on first save
        title: 'Untitled Note',
        content: '',
        tags: [],
        createdAt: new Date().toISOString(),
        status: 'active',
      });
    }
  }, [id, isNewNote, getNote, router]);


  const debouncedUpdate = useDebouncedCallback((updatedNote: Note) => {
    setSyncStatus("syncing");
    if (isNewNote && !updatedNote.id) {
        const newNote = addNote({
            title: updatedNote.title,
            content: updatedNote.content,
            tags: updatedNote.tags,
        });
        // Replace URL with new ID without navigating
        window.history.replaceState(null, '', `/notes/${newNote.id}`);
        setNote(newNote);
    } else {
        updateNote(updatedNote.id, updatedNote);
    }
    setTimeout(() => setSyncStatus("synced"), 1000);
  }, 1500);


  const handleFieldChange = (field: keyof Note, value: any) => {
    if (note) {
      const updatedNote = { ...note, [field]: value };
      setNote(updatedNote);
      setSyncStatus("dirty");
      debouncedUpdate(updatedNote);
    }
  };
  
  const handleContentChange = (content: string) => {
    handleFieldChange('content', content);
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== "") {
      e.preventDefault();
      if (note && !note.tags.includes(tagInput.trim())) {
        handleFieldChange('tags', [...note.tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (note) {
        handleFieldChange('tags', note.tags.filter(tag => tag !== tagToRemove));
    }
  }

  const handleDelete = () => {
    if (note && !isNewNote) {
        deleteNote(note.id);
        router.push('/notes');
    }
  }

  if (!note) {
    return null; // or a loading spinner
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
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isNewNote}>
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
               <DropdownMenuItem asChild>
                 <Link href="/tags" className="w-full">
                    <Tag className="h-4 w-4 mr-2" /> Manage Tags
                 </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
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
              value={note.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
           <Editor
              initialContent={note.content}
              onChange={handleContentChange}
          />
      </main>
        <footer className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
                {note.tags.map(tag => (
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
    </>
  );
}
