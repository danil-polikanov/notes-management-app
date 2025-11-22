// src/components/NoteForm/NoteForm.tsx

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note.types';
import './NoteForm.scss';

interface NoteFormProps {
    note?: Note | null;
    onSubmit: (data: CreateNoteDto) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const NoteForm = ({
    note,
    onSubmit,
    onCancel,
    isLoading,
}: NoteFormProps) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState<{ title?: string; content?: string }>(
        {}
    );

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [note]);

    const validate = (): boolean => {
        const newErrors: { title?: string; content?: string } = {};

        if (!title.trim()) {
            newErrors.title = t('validation.titleRequired');
        } else if (title.trim().length < 3) {
            newErrors.title = t('validation.titleMin');
        } else if (title.trim().length > 100) {
            newErrors.title = t('validation.titleMax');
        }

        if (!content.trim()) {
            newErrors.content = t('validation.contentRequired');
        } else if (content.trim().length < 5) {
            newErrors.content = t('validation.contentMin');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const data = {
            title: title.trim(),
            content: content.trim(),
        };

        onSubmit(data);
    };

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <div className="note-form__header">
                <h2>{note ? t('notes.edit') : t('notes.createNew')}</h2>
            </div>

            <div className="note-form__body">
                <div className="form-group">
                    <label htmlFor="title">{t('form.titleLabel')}</label>
                    <input
                        type="text"
                        id="title"
                        data-cy="note-title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t('form.titlePlaceholder')}
                        className={errors.title ? 'error' : ''}
                        disabled={isLoading}
                    />
                    {errors.title && (
                        <span className="error-message">{errors.title}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="content">{t('form.contentLabel')}</label>
                    <textarea
                        id="content"
                        data-cy="note-content-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={t('form.contentPlaceholder')}
                        className={errors.content ? 'error' : ''}
                        disabled={isLoading}
                        rows={8}
                    />
                    {errors.content && (
                        <span className="error-message">{errors.content}</span>
                    )}
                </div>
            </div>

            <div className="note-form__footer">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-secondary"
                    disabled={isLoading}
                >
                    {t('form.cancel')}
                </button>
                <button
                    type="submit"
                    data-cy="note-submit-button"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading
                        ? '...'
                        : note
                        ? t('form.update')
                        : t('form.create')}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
