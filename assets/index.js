import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProviderCustom } from './ThemeContext';

document.addEventListener('DOMContentLoaded', function () {
  const appDiv = document.getElementById('containerPrincipal');
  if (appDiv) {
    const root = createRoot(appDiv);
    root.render(
      <ThemeProviderCustom>
        <App />
      </ThemeProviderCustom>
    );
  } else {
    console.error("Elemento #containerPrincipal não encontrado.");
  }
});
