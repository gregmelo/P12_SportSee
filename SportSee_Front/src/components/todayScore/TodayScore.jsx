import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './TodayScore.scss';
import { COLORS } from '../../utils/colors';
import TodayScoreModel from './TodayScoreModel';

/**
 * Composant affichant le score du jour sous forme de diagramme circulaire.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.todayScore - Le score du jour (valeur entre 0 et 1).
 * @returns {JSX.Element} Le composant graphique du score du jour.
 */
export default function TodayScore({ todayScore }) {
  // Création d'une instance du modèle pour gérer les données
  const todayScoreData = new TodayScoreModel(todayScore);
  const data = todayScoreData.getChartData();

  return (
    <div className="today-score">
      <h2>Score</h2>
      <ResponsiveContainer>
        <PieChart width={800} height={400}>
          {/* Cercle blanc pour le fond au centre */}
          <Pie
            data={[{ value: 100 }]}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={70}
            fill="#FFFFFF"
            dataKey="value"
          />
          {/* Graphique principal pour le score */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={80}
            fill="#8884d8"
            cornerRadius={10}
            dataKey="value"
            startAngle={90}
            endAngle={90 + 360}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Légende affichant le pourcentage */}
      <div className="legende">
        <p className="score">{todayScoreData.getScorePercentage()}%</p>
        <p>de votre</p>
        <p>objectif</p>
      </div>
    </div>
  );
}

TodayScore.propTypes = {
  /**
   * Le score du jour, sous forme de nombre entre 0 et 1.
   */
  todayScore: PropTypes.number.isRequired,
};
