import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Note {
  id: string
  date: Date
  content: string
}

interface Notes {
  notes: Note[]
  addNote: (content: string) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create(
  persist<Notes>(
    (set) => ({
      notes: [] as Note[],
      addNote: (contentText: string) => {
        const newNote = {
          id: crypto.randomUUID(),
          date: new Date(),
          content: contentText,
        }

        set((state) => ({
          notes: [newNote, ...state.notes],
        }))
      },
      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }))
      },
    }),
    {
      name: '@nlw-audio-notes:store-state-1.0.0',
    },
  ),
)
