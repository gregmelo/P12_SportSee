import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Component } from "react";
import PropTypes from "prop-types";
import "./PerformanceChart.scss";

/**
 * Dictionnaire de traduction pour les types de performance.
 * Les clés correspondent aux types en anglais, et les valeurs sont leurs traductions en français.
 */
const kindTranslations = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

/**
 * Composant React pour afficher un graphique radar des performances utilisateur.
 * 
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.performanceData - Données de performance à afficher.
 * @param {Object} props.performanceData.kind - Dictionnaire des types de performance.
 * @param {Array} props.performanceData.data - Liste des performances avec les types et valeurs.
 * @returns {JSX.Element} Élément JSX représentant un graphique radar des performances.
 */

export default class PerformanceChart extends Component {
  formatData() {
    const { performanceData } = this.props;

  // Validation des données
  if (!performanceData || !performanceData.data || !performanceData.kind) {
    return <p>Erreur : les données de performance sont introuvables.</p>;
  }

  // Formater les données pour inclure les traductions et unifier la structure
  const formattedData = performanceData.data.map((item) => ({
    kind: kindTranslations[performanceData.kind[item.kind]] || "Inconnu", // Traduction ou valeur par défaut
    value: item.value,
  }));

  // Ordre souhaité pour l'affichage des types de performance
  const sortOrder = ["Intensité", "Vitesse", "Force", "Endurance", "Énergie", "Cardio"];

  // Trier les données en fonction de l'ordre prédéfini
  return formattedData.sort((a, b) => sortOrder.indexOf(a.kind) - sortOrder.indexOf(b.kind));
  }

  render() {
    const sortedData = this.formatData();

    if (!sortedData) {
      return <p>Erreur : les données de performance sont introuvables.</p>;
    }

  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="80%" cx="50%" cy="50%" data={sortedData}>
          {/* Grille polaire sans lignes radiales */}
          <PolarGrid radialLines={false} />
          {/* Affichage des axes angulaires avec style des ticks */}
          <PolarAngleAxis 
            dataKey="kind" 
            tick={{ fill: '#ffffff', fontSize: 10 }} 
          />
          {/* Graphique radar avec configuration des couleurs */}
          <Radar 
            name="Performance" 
            dataKey="value" 
            stroke="#E60000" 
            fill="#E60000" 
            fillOpacity={0.6} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
}


// Définition des types des propriétés attendues
PerformanceChart.propTypes = {
  performanceData: PropTypes.shape({
    kind: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        kind: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
