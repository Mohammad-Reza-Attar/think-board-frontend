import { useEffect, useState } from "react";
import { getNotes } from "../api/notes.api";
import NoteCard from "../components/NoteCard";
import NoteSkeleton from "../components/NoteSkeleton";

const NotesPage = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading)
    return (
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <NoteSkeleton key={i} />
        ))}
      </div>
    );
  if (!loading && notes.length === 0)
    return (
      <div className="text-center mt-20 text-gray-400">
        <p className="text-xl mb-2">No notes yet 📝</p>
        <p>Create your first note to get started</p>
      </div>
    );

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOrder === "new") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  return (
    <div className="max-w-6xl mx-auto p-6">
      <input
        className="w-full mb-6 p-3 rounded-lg bg-black border border-gray-700 text-white"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => setSortOrder(sortOrder === "new" ? "old" : "new")}
        className="mb-4 text-sm text-gray-400 hover:text-white"
      >
        Sort: {sortOrder === "new" ? "Newest" : "Oldest"}
      </button>
      <div className="grid md:grid-cols-3 gap-6">
        {sortedNotes.map((note) => (
          <NoteCard key={note._id} note={note} onDeleted={fetchNotes} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
