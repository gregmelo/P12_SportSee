import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Component } from 'react';
import PropTypes from 'prop-types';
import './TodayScore.scss';
import { COLORS } from '../../utils/colors'; // Couleurs utilisées pour le graphique

/**
 * Composant affichant le score du jour sous forme de diagramme circulaire.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.todayScore - Le score du jour (valeur entre 0 et 1).
 * @returns {JSX.Element} Le composant graphique du score du jour.
 */
export default class TodayScore extends Component {
  render() {
    const { todayScore } = this.props;
  // Préparation des données pour le graphique
  const data = [
    { name: 'Score', value: todayScore * 100 }, // Portion du score
    { name: 'Reste', value: 100 - todayScore * 100 }, // Portion restante pour atteindre 100%
  ];

  return (
    <div className="today-score">
      <h2>Score</h2>
      <ResponsiveContainer>
        <PieChart width={800} height={400}>
          {/* Cercle blanc pour le fond au centre */}
          <Pie
            data={[{ value: 100 }]} // Un cercle complet
            cx="50%" // Position horizontale au centre
            cy="50%" // Position verticale au centre
            innerRadius={0} // Cercle plein
            outerRadius={70} // Rayon extérieur
            fill="#FFFFFF" // Couleur blanche
            dataKey="value"
          />
          {/* Graphique principal pour le score */}
          <Pie
            data={data}
            cx="50%" // Position horizontale au centre
            cy="50%" // Position verticale au centre
            innerRadius={70} // Rayon intérieur du graphique
            outerRadius={80} // Rayon extérieur du graphique
            fill="#8884d8" // Couleur de remplissage par défaut
            cornerRadius={10} // Arrondi des angles
            dataKey="value"
            startAngle={90} // Début du graphique (90° pour aligner verticalement)
            endAngle={90 + 360} // Fin du graphique
          >
            {/* Application des couleurs aux segments */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Légende affichant le pourcentage */}
      <div className="legende">
        <p className="score">{todayScore * 100}%</p>
        <p>de votre</p>
        <p>objectif</p>
      </div>
    </div>
  );
}
}

TodayScore.propTypes = {
  /**
   * Le score du jour, sous forme de nombre entre 0 et 1.
   */
  todayScore: PropTypes.number.isRequired,
};
