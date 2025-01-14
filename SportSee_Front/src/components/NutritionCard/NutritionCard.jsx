import PropTypes from "prop-types";
import './NutritionCard.scss';

export default function NutritionCard({  icon, value, label, bgColor  }) {
    console.log('data in NutritionCard: ', icon, value, label, bgColor);
    return (
        <div className="nutrition-card">
            <div 
            className="nutrition-card__icon"
            style={{ backgroundColor: bgColor }}
            >
                <img src={icon} alt={label} />
            </div>
            <div className="nutrition-card__content">
                <span className="value">{value}</span>
                <span className="label">{label}</span>
            </div>
        </div>
    )
}

NutritionCard.propTypes = {
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
};