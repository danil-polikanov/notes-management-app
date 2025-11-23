import { Note, NotesState } from '@/types/note.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchNotes,
    fetchNoteById,
    createNote,
    updateNote,
    deleteNote,
} from '@/services/api.thruck';
const InitialsState: NotesState = {
    notes: [],
    selectedNote: null,
    loading: false,
    error: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState: InitialsState,
    reducers: {
        setSelectedNote: (state, action: PayloadAction<Note | null>) => {
            state.selectedNote = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all notes
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch note by ID
        builder
            .addCase(fetchNoteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNoteById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedNote = action.payload;
            })
            .addCase(fetchNoteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create note
        builder
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes.unshift(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update note
        builder
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.notes.findIndex(
                    (note) => note.id === action.payload.id
                );
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
                if (state.selectedNote?.id === action.payload.id) {
                    state.selectedNote = action.payload;
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete note
        builder
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(
                    (note) => note.id !== action.payload
                );
                if (state.selectedNote?.id === action.payload) {
                    state.selectedNote = null;
                }
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedNote, clearError } = notesSlice.actions;
export default notesSlice.reducer;
