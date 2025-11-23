import { notesApi } from '@/services/api.service';
import { CreateNoteDto, UpdateNoteDto } from '@/types/note.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchNotes = createAsyncThunk(
    'notes/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await notesApi.getAllNotes();
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch notes'
            );
        }
    }
);

export const fetchNoteById = createAsyncThunk(
    'notes/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await notesApi.getNoteById(id);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch note'
            );
        }
    }
);

export const createNote = createAsyncThunk(
    'notes/create',
    async (data: CreateNoteDto, { rejectWithValue }) => {
        try {
            return await notesApi.createNote(data);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create note'
            );
        }
    }
);

export const updateNote = createAsyncThunk(
    'notes/update',
    async (
        { id, data }: { id: string; data: UpdateNoteDto },
        { rejectWithValue }
    ) => {
        try {
            return await notesApi.updateNote(id, data);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update note'
            );
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await notesApi.deleteNote(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete note'
            );
        }
    }
);
