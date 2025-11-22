import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './i18n/config';
import App from './App';

const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
    import('./i18n/config').then((i18n) => {
        i18n.default.changeLanguage(savedLanguage);
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
