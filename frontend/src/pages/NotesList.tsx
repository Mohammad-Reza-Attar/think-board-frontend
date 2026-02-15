import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/notes.api";
import CreateNote from "../components/CreateNote";

interface Note {
  _id: string;
  title: string;
  description: string;
}

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = () => {
    getNotes()
      .then((res) => {
        setNotes(res.data.data);
      })
      .catch(() => {
        setError("Failed to fetch notes");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    fetchNotes();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (notes.length === 0) return <p>No notes found.</p>;

  return (
    <div>
      <CreateNote onCreated={fetchNotes} />
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
