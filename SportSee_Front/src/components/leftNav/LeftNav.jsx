import Bike from '../../assets/sports_icons/bike.png';
import BodyBulding from '../../assets/sports_icons/bodybuilding.png';
import Swimming from '../../assets/sports_icons/swimming.png';
import Yoga from '../../assets/sports_icons/yoga.png';
import './LeftNav.scss';

export default function TopNav() {
    return (
        <nav className="leftNav">
            <div className="leftNav_links">
                <ul>
                <li><img src={ Yoga } alt="icone de Yoga" /></li>
                <li><img src={ Swimming } alt="icone de Natation" /></li>
                <li><img src={ Bike } alt="icone de Vélo" /></li>
                <li><img src={ BodyBulding } alt="icone de BodyBulding" /></li>
                </ul>
            </div>
            <div className="copyRight">
                <p>Copyright, SportSee 2020</p>
            </div>
        </nav>
    )
}