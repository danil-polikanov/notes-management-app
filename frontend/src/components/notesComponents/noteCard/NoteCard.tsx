// src/components/NoteCard/NoteCard.tsx

import { useTranslation } from 'react-i18next';
import { Note } from '@/types/note.types';
import './NoteCard.scss';

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

export const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
    const { t } = useTranslation();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = () => {
        if (window.confirm(t('notes.deleteConfirm'))) {
            onDelete(note.id);
        }
    };

    return (
        <div className="note-card" data-cy="note-card">
            <div className="note-card__header">
                <h3 className="note-card__title" data-cy="note-title">
                    {note.title}
                </h3>
                <div className="note-card__actions">
                    <button
                        onClick={() => onEdit(note)}
                        className="btn-icon btn-edit"
                        data-cy="note-edit-button"
                        title={t('form.edit')}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn-icon btn-delete"
                        data-cy="note-delete-button"
                        title={t('form.delete')}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="note-card__content" data-cy="note-content">
                <p>{note.content}</p>
            </div>

            <div className="note-card__footer">
                <div className="note-card__date">
                    <span className="date-label">{t('date.created')}:</span>
                    <span className="date-value">
                        {formatDate(note.createdAt)}
                    </span>
                </div>
                {note.updatedAt && (
                    <div className="note-card__date">
                        <span className="date-label">{t('date.updated')}:</span>
                        <span className="date-value">
                            {formatDate(note.updatedAt)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteCard;
