
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import { 
    Bold, Italic, Strikethrough, Underline as UnderlineIcon, Heading1, Heading2, Heading3,
    AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code, Minus, Pilcrow, Table as TableIcon
} from "lucide-react";
import { Button } from "./button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "./dropdown-menu";

const EditorToolbar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center gap-1 bg-card border border-border p-2 rounded-t-lg shadow-sm sticky top-0 z-10 flex-wrap">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pilcrow className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                        <Heading1 className="h-4 w-4 mr-2" />
                        Heading 1
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                        <Heading2 className="h-4 w-4 mr-2" />
                        Heading 2
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                        <Heading3 className="h-4 w-4 mr-2" />
                        Heading 3
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        <List className="h-4 w-4 mr-2" />
                        Bullet List
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        <ListOrdered className="h-4 w-4 mr-2" />
                        Numbered List
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                        <Quote className="h-4 w-4 mr-2" />
                        Blockquote
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                        <Code className="h-4 w-4 mr-2" />
                        Code Block
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        <Minus className="h-4 w-4 mr-2" />
                        Horizontal Rule
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                        <TableIcon className="h-4 w-4 mr-2" />
                        Insert Table
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="border-l h-6 mx-1 border-border" />
            <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            >
            <Bold className="h-4 w-4" />
            </Button>
            <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            >
            <Italic className="h-4 w-4" />
            </Button>
            <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            >
            <UnderlineIcon className="h-4 w-4" />
            </Button>
            <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            >
            <Strikethrough className="h-4 w-4" />
            </Button>
            <div className="border-l h-6 mx-1 border-border" />
            <Button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            >
            <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            >
            <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            >
            <AlignRight className="h-4 w-4" />
            </Button>
      </div>
    );
};


const TiptapEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[calc(100vh-340px)] w-full max-w-4xl mx-auto border-0 shadow-none focus-visible:ring-0 p-0 text-lg resize-none bg-transparent",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-b-lg border-t-0">
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
