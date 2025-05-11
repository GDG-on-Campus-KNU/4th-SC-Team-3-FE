import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './global/i18n/i18n.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
