
"use client";

import {
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export const mockNotes = [
  {
    id: "1",
    title: "Project Phoenix Kickoff",
    status: "active",
    createdAt: "2023-10-26",
    tags: ["project", "work"],
  },
  {
    id: "2",
    title: "Q4 Marketing Strategy",
    status: "active",
    createdAt: "2023-10-25",
    tags: ["marketing", "strategy"],
  },
  {
    id: "3",
    title: "Grocery List",
    status: "archived",
    createdAt: "2023-10-24",
    tags: ["personal"],
  },
    {
    id: "4",
    title: "Book Club Summary: Dune",
    status: "active",
    createdAt: "2023-10-22",
    tags: ["reading", "personal"],
  },
  {
    id: "5",
    title: "API Design Best Practices",
    status: "active",
    createdAt: "2023-10-20",
    tags: ["tech", "development"],
  },
];

export default function NotesDashboard() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const allTags = [...new Set(mockNotes.flatMap(note => note.tags))];

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };
  
  const filteredNotes = mockNotes.filter(note => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some(tag => note.tags.includes(tag));
  });

  const activeNotes = filteredNotes.filter(n => n.status === 'active');
  const archivedNotes = filteredNotes.filter(n => n.status === 'archived');


  return (
    <div className="flex flex-col gap-4 h-full p-4 md:p-6">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">My Notes</h1>
             <div className="ml-auto flex items-center gap-2">
                <Link href="/notes/new">
                    <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        New Note
                    </span>
                    </Button>
                </Link>
            </div>
        </div>
      <Tabs defaultValue="all" className="flex flex-col gap-4 h-full">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter by Tag {selectedTags.length > 0 && `(${selectedTags.length})`}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Tag</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 {allTags.length > 0 ? allTags.map(tag => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onSelect={(e) => {
                        e.preventDefault();
                        handleTagSelect(tag);
                    }}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                )) : <DropdownMenuItem disabled>No tags found</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Sort
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Date Created
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last Modified</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Title</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="all" className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>All Notes</CardTitle>
              <CardDescription>
                Manage your notes and keep track of your thoughts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotesTable notes={filteredNotes} />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{filteredNotes.length}</strong> of <strong>{mockNotes.length}</strong> notes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
         <TabsContent value="active" className="flex-1">
           <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Notes</CardTitle>
              <CardDescription>
                Your currently active notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotesTable notes={activeNotes} />
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="archived" className="flex-1">
           <Card className="h-full">
            <CardHeader>
              <CardTitle>Archived Notes</CardTitle>
              <CardDescription>
                Notes you have archived.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotesTable notes={archivedNotes} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotesTable({ notes }: { notes: typeof mockNotes }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Tags</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">
            Created at
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.length > 0 ? notes.map((note) => (
          <TableRow key={note.id}>
            <TableCell className="font-medium">
                <Link href={`/notes/${note.id}`} className="hover:underline">
                    {note.title}
                </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <div className="flex gap-1">
                    {note.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant={note.status === 'active' ? 'outline' : 'secondary'}>{note.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {note.createdAt}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Link href={`/notes/${note.id}`} passHref>
                    <DropdownMenuItem asChild><Link href={`/notes/${note.id}`}>Edit</Link></DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        )) : (
            <TableRow>
                <TableCell colSpan={5} className="text-center h-24">No notes found.</TableCell>
            </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
