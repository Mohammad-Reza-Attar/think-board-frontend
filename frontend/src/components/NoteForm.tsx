import { useState } from "react";
import { createNote, updateNote } from "../api/notes.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  note?: any;
}

const NoteForm = ({ note }: Props) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (note) {
        await updateNote(note._id, { title, content });
        toast.success("Note updated successfully");
      } else {
        await createNote({ title, content });
        toast.success("Note created successfully");
      }

      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#111] p-8 rounded-xl border border-gray-800">
      <h2 className="text-xl text-white mb-6">
        {note ? "Edit Note" : "Create New Note"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-full cursor-pointer">
          {note ? "Update Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
