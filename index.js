import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ← твой компонент App
import './index.css';    // стили, если есть

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
