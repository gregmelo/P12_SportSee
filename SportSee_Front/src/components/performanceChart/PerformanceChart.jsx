/**
 * @file PerformanceChart.jsx
 * @description Composant React affichant un graphique radar des performances utilisateur.
 */

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";
import { Component } from "react";
import PerformanceModel from "./PerformanceModel"; // Importation de la classe de modélisation
import "./PerformanceChart.scss";

/**
 * Composant React pour afficher un graphique radar des performances utilisateur.
 * 
 * @class
 * @extends Component
 */
export default class PerformanceChart extends Component {
  /**
   * Transforme les données de performance et les passe au graphique radar.
   * @returns {JSX.Element} Le graphique radar des performances.
   */
  render() {
    let formattedData;

    try {
      // Création d'une instance de PerformanceModel pour structurer les données
      const performanceModel = new PerformanceModel(this.props.performanceData);
      formattedData = performanceModel.data;
    } catch (error) {
      // Gestion des erreurs en cas de données invalides
      return <p>Erreur : {error.message}</p>;
    }

    return (
      <div className="performance-chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="80%" cx="50%" cy="50%" data={formattedData}>
            {/* Grille polaire sans lignes radiales */}
            <PolarGrid radialLines={false} />
            {/* Affichage des axes angulaires avec style des ticks */}
            <PolarAngleAxis dataKey="kind" tick={{ fill: "#ffffff", fontSize: 10 }} />
            {/* Graphique radar avec configuration des couleurs */}
            <Radar name="Performance" dataKey="value" stroke="#E60000" fill="#E60000" fillOpacity={0.6} />
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
