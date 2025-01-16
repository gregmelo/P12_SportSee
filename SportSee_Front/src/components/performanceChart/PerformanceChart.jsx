import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";
import "./PerformanceChart.scss";


// Dictionnaire de traduction
const kindTranslations = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

export default function PerformanceChart({ performanceData }) {
  console.log("performanceData in component: ", performanceData);

  if (!performanceData || !performanceData.data || !performanceData.kind) {
      console.error("Données de performance incorrectes ou manquantes :", performanceData);
      return <p>Erreur : les données de performance sont introuvables.</p>;
  }

  // Formater les données
  const formattedData = performanceData.data.map((item) => ({
      kind: kindTranslations[performanceData.kind[item.kind]] || "Inconnu",
      value: item.value,
  }));

  console.log("Data passed to RadarChart:", formattedData);

  return (
      <div className="performance-chart">
          <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius="80%" cx="50%" cy="50%" data={formattedData}>
                  <PolarGrid radialLines={false} />
                  <PolarAngleAxis dataKey="kind" tick={{ fill: '#ffffff', fontSize: 10 }} />
                  <Radar name="Performance" dataKey="value" stroke="#E60000" fill="#E60000" fillOpacity={0.6} />
              </RadarChart>
          </ResponsiveContainer>
      </div>
  );
}


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