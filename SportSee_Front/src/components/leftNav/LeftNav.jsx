import Bike from '../../assets/sports_icons/bike.png';
import BodyBulding from '../../assets/sports_icons/bodybuilding.png';
import Swimming from '../../assets/sports_icons/swimming.png';
import Yoga from '../../assets/sports_icons/yoga.png';
import './LeftNav.scss';

/**
 * Composant React pour afficher une barre de navigation verticale à gauche de la page.
 * La navigation inclut des icônes représentant différents sports et un pied de page avec un copyright.
 * 
 * @returns {JSX.Element} Élément JSX représentant la barre de navigation gauche.
 */
export default function LeftNav() {
    return (
        <nav className="leftNav">
            {/* Section contenant les liens et icônes */}
            <div className="leftNav_links">
                <ul>
                    {/* Chaque élément de la liste représente un sport avec une icône */}
                    <li>
                        <img src={Yoga} alt="Icône de Yoga" /> {/* Icône pour le Yoga */}
                    </li>
                    <li>
                        <img src={Swimming} alt="Icône de Natation" /> {/* Icône pour la natation */}
                    </li>
                    <li>
                        <img src={Bike} alt="Icône de Vélo" /> {/* Icône pour le vélo */}
                    </li>
                    <li>
                        <img src={BodyBulding} alt="Icône de Musculation" /> {/* Icône pour la musculation */}
                    </li>
                </ul>
            </div>
            {/* Section contenant le texte de copyright */}
            <div className="copyRight">
                <p>Copyright, SportSee 2020</p>
            </div>
        </nav>
    );
}
