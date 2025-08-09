
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    status: 'active' | 'archived';
}

const initialNotes: Note[] = [
    {
      id: "1",
      title: "Project Phoenix Kickoff",
      content: "<p>Meeting notes from the initial planning session for <strong>Project Phoenix</strong>. Key discussion points included <em>budget allocation</em>, team roles, and project timeline. Next steps are to finalize the project charter and schedule a follow-up meeting with stakeholders.</p>",
      status: "active",
      createdAt: "2023-10-26",
      tags: ["project", "work"],
    },
    {
      id: "2",
      title: "Q4 Marketing Strategy",
      content: "<p>Brainstorming session for Q4 marketing campaigns. Focus on social media engagement and influencer collaborations.</p>",
      status: "active",
      createdAt: "2023-10-25",
      tags: ["marketing", "strategy"],
    },
    {
      id: "3",
      title: "Grocery List",
      content: "<ul><li>Milk</li><li>Bread</li><li>Eggs</li><li>Cheese</li></ul>",
      status: "archived",
      createdAt: "2023-10-24",
      tags: ["personal"],
    },
      {
      id: "4",
      title: "Book Club Summary: Dune",
      content: "<p>Discussion points on Dune by Frank Herbert. Themes of power, religion, and ecology.</p>",
      status: "active",
      createdAt: "2023-10-22",
      tags: ["reading", "personal"],
    },
    {
      id: "5",
      title: "API Design Best Practices",
      content: "<h3>Key Principles:</h3><ol><li>Consistency in naming conventions.</li><li>Use of proper HTTP status codes.</li><li>Versioning for APIs.</li></ol>",
      status: "active",
      createdAt: "2023-10-20",
      tags: ["tech", "development"],
    },
];

interface NotesStore {
  notes: Note[];
  getNote: (id: string) => Note | undefined;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'status'>) => Note;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: initialNotes,
      getNote: (id: string) => get().notes.find((note) => note.id === id),
      addNote: (note) => {
        const newNote: Note = {
          ...note,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          status: 'active',
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
        return newNote;
      },
      updateNote: (id, updatedNote) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: 'notes-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
