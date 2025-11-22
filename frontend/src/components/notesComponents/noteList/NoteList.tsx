// src/components/NotesList/NotesList.tsx

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setSelectedNote } from '@/store/slices/notesSlice';
import {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
} from '@/services/api.thruck';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note.types';
import { NoteCard } from '@/components/notesComponents/noteCard/NoteCard';
import { NoteForm } from '@/components/notesComponents/noteForm/NoteForm';
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher';
import { toast } from 'react-toastify';
import './NoteList.scss';

export const NotesList = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { notes, selectedNote, loading, error } = useAppSelector(
        (state) => state.notes
    );

    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // show all notes on component mount
    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    // Show error toast if error occurs
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleSubmitNote = async (data: CreateNoteDto) => {
        try {
            if (selectedNote) {
                // Update existing note
                await dispatch(
                    updateNote({ id: selectedNote.id, data })
                ).unwrap();
                toast.success(t('messages.updated'));
                dispatch(setSelectedNote(null));
            } else {
                // Create new note
                await dispatch(createNote(data)).unwrap();
                toast.success(t('messages.created'));
            }
            setShowForm(false);
        } catch (err) {
            toast.error(t('messages.error'));
        }
    };

    const handleEditNote = (note: Note) => {
        dispatch(setSelectedNote(note));
        setShowForm(true);
    };

    const handleDeleteNote = async (id: string) => {
        try {
            await dispatch(deleteNote(id)).unwrap();
            toast.success(t('messages.deleted'));
        } catch (err) {
            toast.error(t('messages.error'));
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        dispatch(setSelectedNote(null));
    };

    const handleNewNote = () => {
        dispatch(setSelectedNote(null));
        setShowForm(true);
    };

    // Filter notes based on search query
    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="notes-container">
            {/* Header */}
            <header className="notes-header">
                <div className="notes-header__content">
                    <div>
                        <h1>{t('app.title')}</h1>
                        <p className="subtitle">{t('app.subtitle')}</p>
                    </div>
                    <LanguageSwitcher />
                </div>
            </header>

            {/* Main Content */}
            <main className="notes-main">
                {showForm ? (
                    <div className="notes-form-container">
                        <NoteForm
                            note={selectedNote}
                            onSubmit={handleSubmitNote}
                            onCancel={handleCancelForm}
                            isLoading={loading}
                        />
                    </div>
                ) : (
                    <>
                        {/* Actions Bar */}
                        <div className="notes-actions">
                            <input
                                type="text"
                                data-cy="search-input"
                                placeholder={t('notes.search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button
                                onClick={handleNewNote}
                                data-cy="create-note-button"
                                className="btn btn-primary"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                {t('notes.createNew')}
                            </button>
                        </div>

                        {/* Loading State */}
                        {loading && notes.length === 0 && (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Loading notes...</p>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && filteredNotes.length === 0 && (
                            <div className="empty-state">
                                <svg
                                    width="120"
                                    height="120"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                                <p>
                                    {searchQuery
                                        ? 'No notes found'
                                        : t('notes.noNotes')}
                                </p>
                            </div>
                        )}

                        {/* Notes Grid */}
                        {!loading && filteredNotes.length > 0 && (
                            <div className="notes-grid">
                                {filteredNotes.map((note) => (
                                    <NoteCard
                                        key={note.id}
                                        note={note}
                                        onEdit={handleEditNote}
                                        onDelete={handleDeleteNote}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default NotesList;
