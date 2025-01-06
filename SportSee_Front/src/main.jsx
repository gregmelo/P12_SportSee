import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/**
 * Point d'entrée de l'application
 * 
 * Ce fichier est responsable de l'initialisation et du rendu de l'application React dans le DOM. Il utilise `StrictMode` pour activer des vérifications supplémentaires de développement.
 * Le composant `App` est rendu à l'intérieur de l'élément HTML avec l'id `root`.
 * 
 * @returns {void} Aucun retour, ce fichier exécute seulement le rendu de l'application dans le DOM.
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
