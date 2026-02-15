import { Link } from "react-router-dom";
import { deleteNote } from "../api/notes.api";
import toast from "react-hot-toast";

interface Props {
  note: any;
  onDeleted: () => void;
}

const NoteCard = ({ note, onDeleted }: Props) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await deleteNote(note._id);
      toast.success("Note deleted");
      onDeleted();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-white mb-2">{note.title}</h3>

      <p className="text-gray-400 mb-4">{note.content}</p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-3">
          <Link
            to={`/edit/${note._id}`}
            className="text-gray-400 hover:text-white"
          >
            ✏️
          </Link>

          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-400 cursor-pointer"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
