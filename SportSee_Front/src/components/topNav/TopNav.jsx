import Logo from '../../assets/logo.png';
import './TopNav.scss';

export default function TopNav() {
    return (
        <nav className="topNav">
            <img src={Logo} alt="sport see logo" className="logo"/>
            <div className="topNav_links">
                <ul>
                <li>Accueil</li>
                <li>Profil</li>
                <li>Réglage</li>
                <li>Communauté</li>
                </ul>
            </div>
        </nav>
    )
}