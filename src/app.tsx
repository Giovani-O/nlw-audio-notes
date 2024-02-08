import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'
import { useNotesStore } from './store'

export function App() {
  const notesList = useNotesStore((store) => store.notes)

  const [search, setSearch] = useState('')

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes =
    search !== ''
      ? notesList.filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase()),
        )
      : notesList

  return (
    // Check Tailwind's docs for explanations abou the classes:
    // https://tailwindcss.com/docs
    <main className="mx-auto max-w-6xl my-12 space-y-6 px-5 xl:px-0">
      <img src={logo} alt="NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />

        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} />
        })}
      </div>
    </main>
  )
}
