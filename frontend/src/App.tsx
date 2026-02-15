import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotesPage from "./pages/NotesPage";
import NoteForm from "./components/NoteForm";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/create" element={<NoteForm />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
