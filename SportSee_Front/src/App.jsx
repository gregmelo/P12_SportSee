import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Errors from './pages/errors/Errors';
import Dashboard from './pages/dashboard/Dashboard';
import './utils/style/style.scss';

/**
 * Composant App
 *
 * Ce composant est l'élément principal de l'application. Il configure le routage via React Router et définit les routes principales :
 * - La page utilisateur (Dashboard) est accessible à l'URL "/user/:Id", où `:Id` est un paramètre dynamique correspondant à l'identifiant de l'utilisateur.
 * - Toute autre URL non définie redirige vers la page d'erreur (Errors).
 *
 * @returns {JSX.Element} Le composant principal de l'application avec le routage et l'affichage des pages.
 */
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/user/:id" element={<Dashboard />} />
          <Route path="*" element={<Errors />} />
        </Routes>
      </Router>
    </>
  );
}