import PropTypes from "prop-types";
import { Component } from "react";
import './NutritionCard.scss';

/**
 * Composant React pour afficher une carte de nutrition avec une icône, une valeur, et un label.
 * Ce composant permet de mettre en avant une donnée nutritionnelle, comme des calories ou des protéines.
 * 
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.icon - URL de l'icône à afficher.
 * @param {string} props.value - Valeur nutritionnelle (ex. "2000 kcal").
 * @param {string} props.label - Description de la valeur (ex. "Calories").
 * @param {string} props.bgColor - Couleur de fond pour l'icône.
 * @returns {JSX.Element} Élément JSX représentant une carte de nutrition.
 */
export default class NutritionCard extends Component {
    render() {
        const { icon, value, label, bgColor } = this.props;

    return (
        <div className="nutrition-card">
            {/* Conteneur pour l'icône avec un fond coloré */}
            <div 
                className="nutrition-card__icon"
                style={{ backgroundColor: bgColor }} // Couleur de fond personnalisée
            >
                <img src={icon} alt={label} /> {/* Affichage de l'icône */}
            </div>

            {/* Conteneur pour les informations textuelles */}
            <div className="nutrition-card__content">
                <span className="value">{value}</span> {/* Affichage de la valeur nutritionnelle */}
                <span className="label">{label}</span> {/* Affichage de la description */}
            </div>
        </div>
    );
}
}
// Définition des types des propriétés pour garantir une utilisation correcte
NutritionCard.propTypes = {
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
};
