import PropTypes from "prop-types";

/**
 * Composant React représentant un curseur personnalisé pour un graphique.
 * Affiche un rectangle semi-transparent centré sur le point actif du graphique.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.points - Liste des points du graphique, dont le premier sert à positionner le curseur.
 * @param {number} props.height - Hauteur du graphique (non utilisée actuellement).
 * @returns {JSX.Element|null} Un élément SVG `<rect>` représentant le curseur ou `null` si aucun point n'est fourni.
 */
export default function CustomCursor({ points }) {

  // Si aucun point n'est défini ou si la liste des points est vide, le curseur n'est pas affiché.
  if (!points || points.length === 0) {
    return null;
  }

  // Coordonnée x du point actif pour positionner le curseur.
  const x = points[0].x;
  const cursorWidth = 40; // Largeur du rectangle représentant le curseur.

  return (
    <rect
      x={x - cursorWidth / 2} // Centre le rectangle autour de la coordonnée x du point actif.
      y={0} // Le rectangle commence à la position 0 sur l'axe vertical (tout en haut).
      width="105%" // Largeur légèrement supérieure au graphique pour couvrir les cas limites (comme après dimanche).
      height="100%" // Le rectangle s'étend sur toute la hauteur du graphique.
      fill="#000000" // Couleur de remplissage du rectangle (noir).
      fillOpacity={0.1} // Opacité du rectangle pour un effet de surbrillance.
    />
  );
}

// Validation des types des props avec PropTypes
CustomCursor.propTypes = {
  points: PropTypes.array, // Liste des points contenant les coordonnées.
  height: PropTypes.number, // Hauteur du graphique (non utilisée directement dans ce composant).
};
