import PropTypes from "prop-types";

/**
 * Composant React personnalisé pour afficher un tooltip (info-bulle) dans un graphique.
 * Le contenu affiché dépend du nombre de valeurs à montrer (`numberOfValues`).
 * 
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.active - Indique si le tooltip est actif et doit être affiché.
 * @param {Array} props.payload - Données transmises au tooltip, contenant les valeurs à afficher.
 * @param {number} props.numberOfValues - Nombre de valeurs à afficher dans le tooltip.
 * @returns {JSX.Element|null} Un élément JSX représentant le tooltip ou `null` si inactif.
 */
export default function CustomizedTooltip({ active, payload, numberOfValues }) {
    // Vérifie si le tooltip est actif et que les données (payload) sont disponibles et valides.
    if (active && payload && payload.length) {
        return (
            <div className="customized-tooltip">
                {/* Affichage conditionnel en fonction du nombre de valeurs */}
                {numberOfValues === 2 ? (
                    <>
                        <p>{`${payload[0].value} kg`}</p> {/* Affiche la première valeur avec l'unité kg */}
                        <p>{`${payload[1].value} kCal`}</p> {/* Affiche la deuxième valeur avec l'unité kCal */}
                    </>
                ) : (
                    <>
                        <p>{`${payload[0].value} min`}</p> {/* Affiche une valeur unique avec l'unité min */}
                    </>
                )}
            </div>
        );
    }

    // Retourne null si le tooltip n'est pas actif ou si les données sont absentes.
    return null;
}

// Validation des types des props avec PropTypes
CustomizedTooltip.propTypes = {
    active: PropTypes.bool, // Indique si le tooltip est actif
    payload: PropTypes.array, // Tableau contenant les données du tooltip
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Libellé du tooltip (string ou number accepté)
    numberOfValues: PropTypes.number, // Nombre de valeurs à afficher dans le tooltip
};
