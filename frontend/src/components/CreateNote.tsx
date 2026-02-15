import { useState } from "react";
import { createNote } from "../api/notes.api";

const CreateNote = ({ onCreated }: { onCreated: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) return;

    await createNote({ title, content });

    setTitle("");
    setcontent("");
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="content"
        value={content}
        onChange={(e) => setcontent(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default CreateNote;
