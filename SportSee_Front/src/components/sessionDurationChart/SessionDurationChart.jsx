import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area} from 'recharts';
import PropTypes from 'prop-types';
import CustomizedTooltip from '../customizedTooltip/CustomizedTooltip';
import './SessionDurationChart.scss';
import CustomCursor from '../customCursor/CustomCursor';

export default function SessionDurationChart({ averageSessions }) {
  console.log('averageSessions in component: ', averageSessions);

  // Vérification et transformation des données
  const sessionData = averageSessions?.sessions?.map(session => ({
    day: session.day,
    sessionLength: session.sessionLength,
  })) || [];

  if (sessionData.length > 0) {
    // Ajouter un point fictif avant le premier point
    const beforePoint = {
      day: 0, // Jour fictif avant le début
      sessionLength: sessionData[0].sessionLength,
      isFictif: true,
    };
  
    // Ajouter un point fictif après le dernier point
    const afterPoint = {
      day: 8, // Jour fictif après la fin
      sessionLength: sessionData[sessionData.length - 1].sessionLength,
      isFictif: true,
    };
  
    sessionData.unshift(beforePoint);
    sessionData.push(afterPoint);
  }
  

  console.log('Data passed to LineChart:', sessionData);

  return (
    <div className="session-duration">
      <h2>Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessionData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
<XAxis
  dataKey="day"
  axisLine={false}
  tickLine={false}
  tickFormatter={(tick) =>
    tick >= 1 && tick <= 7 ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'][tick - 1] : ''
  }
  tick={{ fill: '#ffffff99', fontSize: 12 }}
  padding={{ left: -20, right: -20 }}
/>

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#ffffff99', fontSize: 12 }}
            domain={['dataMin - 10', 'dataMax + 20']}
            hide={true}
          />
          <Tooltip
            content={<CustomizedTooltip numberOfValues={1} />}
            cursor={<CustomCursor />}
          />
          <Area
            type="monotone"
            dataKey="sessionLength"
            stroke="none" // Aucune bordure pour l'Area
            fill="#000000" // Couleur de fond sous la courbe
            fillOpacity={0.3} // Transparence de la couleur
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

SessionDurationChart.propTypes = {
  averageSessions: PropTypes.object,
};
