// Layout.jsx
import { Outlet } from 'react-router-dom';
import TopNav from '../topNav/TopNav'; // Import du composant TopNav
import LeftNav from '../leftNav/LeftNav';

/**
 * Composant Layout.
 * Il contient la barre de navigation et rend l'outlet pour les pages dynamiques.
 */
export default function Layout() {
  return (
    <div>
      <TopNav />
      <LeftNav />
      <main>
        <Outlet /> {/* Ceci rend les pages en fonction de la route */}
      </main>
    </div>
  );
}
