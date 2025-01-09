import PropTypes from "prop-types";

export default function CustomCursor({ points, height }) {
  console.log("CustomCursor props:", { points, height });

  if (!points || points.length === 0) {
    return null; // Si aucun point n'est défini, ne rien afficher
  }

  const x = points[0].x; // Coordonnée x du point actif
  const cursorWidth = 40; // Largeur du voile

  return (
    <rect
      x={x - cursorWidth / 2} // Centre le rectangle autour du point
      y={0} // Le rectangle commence tout en haut
      width="100%" // Prend toute la largeur du graphique
      height="100%" // Prend toute la hauteur du graphique
      fill="#000000"
      fillOpacity={0.1}
    />
  );
}

CustomCursor.propTypes = {
  points: PropTypes.array,
  height: PropTypes.number,
};
