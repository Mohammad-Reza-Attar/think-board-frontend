import { api } from "./axios";

export interface NotePayload {
  title: string;
  content: string;
}

export const getNotes = () => api.get("/api/notes");

export const getNoteById = (id: string) => api.get(`/api/notes/${id}`);

export const createNote = (data: NotePayload) => api.post("/api/notes", data);

export const updateNote = (id: string, data: NotePayload) =>
  api.put(`/api/notes/${id}`, data);

export const deleteNote = (id: string) => api.delete(`/api/notes/${id}`);
