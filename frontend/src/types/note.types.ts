export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateNoteDto {
    title: string;
    content: string;
}
export interface UpdateNoteDto {
    title?: string;
    content?: string;
}
export interface NotesState {
    notes: Note[];
    selectedNote: Note | null;
    loading: boolean;
    error: string | null;
}
