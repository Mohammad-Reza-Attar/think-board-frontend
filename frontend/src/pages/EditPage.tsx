import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById } from "../api/notes.api";
import NoteForm from "../components/NoteForm";

const EditPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getNoteById(id)
      .then((res) => {
        setNote(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!note) return <p className="text-center mt-10">Note not found</p>;

  return <NoteForm note={note} />;
};

export default EditPage;
