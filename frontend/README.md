Structure frontend

frontend/
├── cypress/ # End-to-end testing
│ ├── e2e/
│ ├── fixtures/
│ └── support/
│
├── node_modules/ # Dependencies
│
├── public/ # Static assets
│
├── src/ # Source code
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # React components
│ ├── i18n/ # Internationalization
│ ├── services/ # API services
│ ├── store/ # State management
│ ├── styles/ # Global styles
│ ├── types/ # TypeScript type definitions
│ ├── App.css # App styles
│ ├── App.tsx # Main App component
│ ├── index.css # Global CSS
│ └── main.tsx # Entry point
│
├── .env # Environment variables
├── .env.example # Environment variables template
├── cypress.config.ts # Cypress configuration
├── eslint.config.js # ESLint configuration
├── index.html # HTML template
├── package-lock.json # Lock file
├── package.json # Dependencies and scripts
├── README.md # Frontend documentation
├── tsconfig.app.json # TypeScript config for app
├── tsconfig.json # TypeScript base config
├── tsconfig.node.json # TypeScript config for Node
└── vite.config.ts # Vite configuration

✨ Features

📝 Full CRUD Operations - Create, Read, Update, Delete notes
🔄 Redux State Management - Centralized state with Redux Toolkit
🌍 Multi-language Support - English, Ukrainian, Russian (i18n)
🔍 Real-time Search - Filter notes instantly
✅ Form Validation - Client-side validation with error messages
📱 Responsive Design - Mobile-first, works on all devices
🧪 E2E Testing - Comprehensive Cypress test suite
🎨 Modern UI - SCSS styling with smooth animations
💪 TypeScript - Full type safety throughout
🚀 Fast Development - Hot Module Replacement with Vite

## React Compiler

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Other configs...

            // Remove tseslint.configs.recommended and replace with this
            tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs['recommended-typescript'],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```
