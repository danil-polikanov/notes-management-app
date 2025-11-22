// src/i18n/config.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            app: {
                title: 'Notes App',
                subtitle: 'Manage your notes easily',
            },
            notes: {
                title: 'My Notes',
                createNew: 'Create New Note',
                edit: 'Edit Note',
                noNotes: 'No notes yet. Create your first note!',
                deleteConfirm: 'Are you sure you want to delete this note?',
                search: 'Search notes...',
            },
            form: {
                titleLabel: 'Title',
                titlePlaceholder: 'Enter note title',
                contentLabel: 'Content',
                contentPlaceholder: 'Write your note content here...',
                save: 'Save',
                cancel: 'Cancel',
                create: 'Create',
                update: 'Update',
                delete: 'Delete',
                edit: 'Edit',
            },
            validation: {
                titleRequired: 'Title is required',
                titleMin: 'Title must be at least 3 characters',
                titleMax: 'Title must not exceed 100 characters',
                contentRequired: 'Content is required',
                contentMin: 'Content must be at least 5 characters',
            },
            messages: {
                created: 'Note created successfully',
                updated: 'Note updated successfully',
                deleted: 'Note deleted successfully',
                error: 'An error occurred',
            },
            language: {
                select: 'Language',
                en: 'English',
                uk: 'Українська',
            },
            date: {
                created: 'Created',
                updated: 'Updated',
            },
        },
    },
    uk: {
        translation: {
            app: {
                title: 'Додаток Нотаток',
                subtitle: 'Керуйте своїми нотатками легко',
            },
            notes: {
                title: 'Мої Нотатки',
                createNew: 'Створити Нову Нотатку',
                edit: 'Редагувати Нотатку',
                noNotes: 'Нотаток ще немає. Створіть свою першу нотатку!',
                deleteConfirm: 'Ви впевнені, що хочете видалити цю нотатку?',
                search: 'Пошук нотаток...',
            },
            form: {
                titleLabel: 'Заголовок',
                titlePlaceholder: 'Введіть заголовок нотатки',
                contentLabel: 'Зміст',
                contentPlaceholder: 'Напишіть зміст вашої нотатки тут...',
                save: 'Зберегти',
                cancel: 'Скасувати',
                create: 'Створити',
                update: 'Оновити',
                delete: 'Видалити',
                edit: 'Редагувати',
            },
            validation: {
                titleRequired: "Заголовок обов'язковий",
                titleMin: 'Заголовок має містити мінімум 3 символи',
                titleMax: 'Заголовок не повинен перевищувати 100 символів',
                contentRequired: "Зміст обов'язковий",
                contentMin: 'Зміст має містити мінімум 5 символів',
            },
            messages: {
                created: 'Нотатку успішно створено',
                updated: 'Нотатку успішно оновлено',
                deleted: 'Нотатку успішно видалено',
                error: 'Сталася помилка',
            },
            language: {
                select: 'Мова',
                en: 'English',
                uk: 'Українська',
            },
            date: {
                created: 'Створено',
                updated: 'Оновлено',
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
