import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './TopNav.scss';

/**
 * Composant affichant la barre de navigation supérieure.
 *
 * @returns {JSX.Element} Le composant de la barre de navigation.
 */
export default function TopNav() {
    return (
        <nav className="topNav">
            {/* Logo de l'application */}
            <img src={Logo} alt="sport see logo" className="logo" />

            {/* Liens de navigation */}
            <div className="topNav_links">
                <ul>
                    {/* Lien vers la page d'accueil */}
                    <li><Link to="/">Accueil</Link></li>

                    {/* Lien vers le profil utilisateur par défaut (id=12) */}
                    <li><Link to="/user/12">Profil</Link></li>

                    {/* Lien placeholder pour la page de réglages */}
                    <li><Link to="/*">Réglage</Link></li>

                    {/* Lien placeholder pour la page de communauté */}
                    <li><Link to="/*">Communauté</Link></li>
                </ul>
            </div>
        </nav>
    );
}
