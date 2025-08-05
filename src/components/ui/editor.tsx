
"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, Underline as UnderlineIcon } from "lucide-react";
import { Button } from "./button";

const TiptapEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[calc(100vh-280px)] w-full max-w-4xl mx-auto border-0 shadow-none focus-visible:ring-0 p-0 text-lg resize-none bg-transparent",
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
    <>
      {editor && <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="flex items-center gap-1 bg-card border border-border p-1 rounded-lg shadow-xl"
      >
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          size="icon"
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          size="icon"
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive('strike') ? 'default' : 'ghost'}
          size="icon"
          className="h-8 w-8"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size="icon"
            className="h-8 w-8"
        >
            <UnderlineIcon className="h-4 w-4" />
        </Button>
         <div className="border-l h-6 mx-1 border-border" />
         <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
          size="icon"
          className="h-8 w-8"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
         <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
          size="icon"
          className="h-8 w-8"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
         <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
          size="icon"
          className="h-8 w-8"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </>
  );
};

export default TiptapEditor;
