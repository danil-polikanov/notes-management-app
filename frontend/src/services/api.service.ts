import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note.types';

const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL);
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// for exceptions handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const notesApi = {
    //Get /api/note
    getAllNotes: async (): Promise<Note[]> => {
        const response = await api.get<Note[]>(`/notes`);
        return response.data;
    },
    //Get /api/note/:id
    getNoteById: async (id: string): Promise<Note> => {
        const response = await api.get<Note>(`/notes/${id}`);
        return response.data;
    },
    //Post /api/notes
    createNote: async (noteData: CreateNoteDto): Promise<Note> => {
        const response = await api.post<Note>(`/notes`, noteData);
        return response.data;
    },
    //Put /api/notes/:id
    updateNote: async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
        const response = await api.put<Note>(`/notes/${id}`, noteData);
        return response.data;
    },
    //Delete /api/notes/:id
    deleteNote: async (id: string): Promise<void> => {
        await api.delete<void>(`/notes/${id}`);
    },
};
