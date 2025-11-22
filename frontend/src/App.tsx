// src/App.tsx

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { NotesList } from '@/components/notesComponents/noteList/NoteList';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';

function App() {
    // Восстанавливаем сохраненный язык при загрузке
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            // i18n уже инициализирован в main.tsx
        }
    }, []);

    return (
        <>
            <NotesList />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
