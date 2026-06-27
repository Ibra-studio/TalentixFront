"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Quote, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, Link2
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-icon underline cursor-pointer font-medium",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        // AJOUT : Classes explicites pour que les titres H1, H2, H3 s'affichent correctement à l'écran
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] p-4 text-sm text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_blockquote]:border-l-2 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // Déterminer le format actuel pour le dropdown
  const getCurrentFormat = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    return "paragraph";
  };

  // Correction de la bascule des titres (on reset en paragraphe d'abord pour éviter les conflits de nœuds)
  const handleFormatChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "h1") {
      editor.chain().focus().setParagraph().toggleHeading({ level: 1 }).run();
    } else if (value === "h2") {
      editor.chain().focus().setParagraph().toggleHeading({ level: 2 }).run();
    } else if (value === "h3") {
      editor.chain().focus().setParagraph().toggleHeading({ level: 3 }).run();
    }
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL du lien :", previousUrl || "https://");
    
    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="w-full border border-border bg-background rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-all">
      
      {/* Zone de saisie de texte */}
      <EditorContent editor={editor} />

      {/* Séparateur horizontal discret */}
      <hr className="border-border mx-4" />

      {/* Barre d'outils (Toolbar) */}
      <div className="flex flex-wrap items-center justify-between p-2 bg-muted/10 gap-1 select-none">
        <div className="flex items-center gap-0.5">
          
          {/* Dropdown de sélection du type de texte */}
          <div className="relative inline-block border-r border-border pr-1.5 mr-1">
            <select
              value={getCurrentFormat()}
              onChange={(e) => handleFormatChange(e.target.value)}
              className="bg-transparent text-xs font-medium text-foreground py-1 px-2 pr-5 rounded-md hover:bg-muted focus:outline-none appearance-none cursor-pointer"
            >
              <option value="paragraph" className="bg-background">Text</option>
              <option value="h1" className="bg-background">H1</option>
              <option value="h2" className="bg-background">H2</option>
              <option value="h3" className="bg-background">H3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center text-muted-foreground/70">
              <span className="text-[9px]">▼</span>
            </div>
          </div>

          {/* Format texte de base (text-brand remplacé par text-icon) */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive("bold") ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <Bold className="h-4 w-4" />
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive("italic") ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <Italic className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive("underline") ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>

          <span className="w-[1px] h-4 bg-border mx-1" />

          {/* Alignement */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive({ textAlign: "left" }) ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <AlignLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive({ textAlign: "center" }) ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <AlignCenter className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive({ textAlign: "right" }) ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <AlignRight className="h-4 w-4" />
          </button>

          <span className="w-[1px] h-4 bg-border mx-1" />

          {/* Listes et citations */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive("bulletList") ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <List className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive("orderedList") ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <ListOrdered className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive("blockquote") ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <Quote className="h-4 w-4" />
          </button>

          <span className="w-[1px] h-4 bg-border mx-1" />

          {/* Liens hypertexte */}
          <button
            type="button"
            onClick={addLink}
            className={`p-2 rounded-lg transition-colors hover:bg-muted ${editor.isActive("link") ? "bg-muted text-icon" : "text-muted-foreground"}`}
          >
            <Link2 className="h-4 w-4" />
          </button>
        </div>

        {/* Historique à droite */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-30"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}