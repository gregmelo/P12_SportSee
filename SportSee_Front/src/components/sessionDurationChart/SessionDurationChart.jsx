import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Component } from 'react';
import PropTypes from 'prop-types';
import CustomizedTooltip from '../customizedTooltip/CustomizedTooltip';
import './SessionDurationChart.scss';
import CustomCursor from '../customCursor/CustomCursor';

/**
 * Composant affichant la durée moyenne des sessions sous forme de graphique.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.averageSessions - Données contenant les sessions moyennes.
 * @param {Array} props.averageSessions.sessions - Tableau des sessions avec le jour et la durée.
 * @returns {JSX.Element} Le composant graphique de durée moyenne des sessions.
 */
export default class SessionDurationChart extends Component {
  processData() {
    const { averageSessions } = this.props;
  // Transformation des données pour le graphique
  const sessionData = averageSessions?.sessions?.map(session => ({
    day: session.day, // Jour de la session
    sessionLength: session.sessionLength, // Durée de la session
  })) || [];

  // Ajout de points fictifs pour créer un effet visuel arrondi
  if (sessionData.length > 0) {
    // Point fictif avant le premier point
    const beforePoint = {
      day: 0, // Jour fictif avant le début
      sessionLength: sessionData[0].sessionLength, // Même durée que le premier point réel
      isFictif: true, // Indicateur de point fictif
    };

    // Point fictif après le dernier point
    const afterPoint = {
      day: 8, // Jour fictif après la fin
      sessionLength: sessionData[sessionData.length - 1].sessionLength, // Même durée que le dernier point réel
      isFictif: true, // Indicateur de point fictif
    };

    sessionData.unshift(beforePoint); // Ajouter au début du tableau
    sessionData.push(afterPoint); // Ajouter à la fin du tableau
  }
  return sessionData;
}

render() {
  const sessionData = this.processData();

  return (
    // <div className="session-duration">
    //   <h2>Durée moyenne des sessions</h2>
    //   <ResponsiveContainer width="100%" height="100%">
    //     <AreaChart
    //       data={sessionData}
    //       margin={{
    //         top: 0,
    //         right: 0,
    //         left: 0,
    //         bottom: 0,
    //       }}
    //     >
        
    //       {/* Axe X pour les jours */}
    //       <XAxis
    //         dataKey="day"
    //         axisLine={false}
    //         tickLine={false}
    //         tickFormatter={(tick) =>
    //           tick >= 1 && tick <= 7 ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'][tick - 1] : ''
    //         }
    //         tick={{ fill: '#ffffff99', fontSize: 12 }}
    //         padding={{ left: -20, right: -20 }}
    //       />

    //       {/* Axe Y (invisible, utilisé pour l'échelle) */}
    //       <YAxis
    //         axisLine={false}
    //         tickLine={false}
    //         tick={{ fill: '#ffffff99', fontSize: 12 }}
    //         domain={['dataMin - 20', 'dataMax + 20']} // Ajout de marge pour les points fictifs
    //         hide={true}
    //       />

    //       {/* Infobulle personnalisée */}
    //       <Tooltip
    //         content={<CustomizedTooltip numberOfValues={1} />}
    //         cursor={<CustomCursor />}
    //       />

    //       {/* Dégradé pour le remplissage de la courbe */}
    //       <defs>
    //         <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
    //           <stop offset="0%" stopColor="rgba(255, 255, 255, 0.106534)" stopOpacity={0.3} />
    //           <stop offset="100%" stopColor="rgba(255, 255, 255, 0.106534)" stopOpacity={0.3} />
    //         </linearGradient>
    //       </defs>

    //       {/* Zone et ligne représentant les données */}
    //       <Area
    //         type="natural"
    //         dataKey="sessionLength"
    //         stroke="#FFFFFF"
    //         strokeOpacity={0.7}
    //         strokeWidth={2}
    //         dot={false}
    //         fill="#FFFFFF"
    //         fillOpacity={0.1}
    //         z-index={1000}
    //         activeDot={{
    //             r: 4, // taille du point au survol
    //             stroke: "#FFFFFF30", // Bordure semi-transparente
    //             strokeWidth: 9,
    //             fill: "#FFFFFF", // Fond blanc
    //           }}
    //       />
    //     </AreaChart>
    //   </ResponsiveContainer>
    // </div>

    <div className='session-duration'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <AreaChart
            syncId="anyId"
            data={sessionData}
            margin={{ top: 50, bottom: -30 }}
            style={{ backgroundColor: "#FF0000" }}
          >
            <XAxis
              dataKey="day"
              padding={{ left: -20, right: -20 }}
              axisLine={false}
              tickLine={false}
              stroke='#FFFFFF50'
              tick={{ dy: -30 }}
              tickFormatter={(tick) =>
              tick >= 1 && tick <= 7 ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'][tick - 1] : ''
            }
            />
            <YAxis
              domain={['dataMin - 30', 'dataMax + 20']}
              hide={true}
            />
            <Tooltip
              // cursor={{ stroke: "none" }}
            content={<CustomizedTooltip numberOfValues={1} />}
            cursor={<CustomCursor />}
            />
            <Area
              type="natural"
              dataKey="sessionLength"
              stroke="#FFFFFF"
              strokeOpacity={0.7}
              strokeWidth={2}
              dot={false}
              fill="#FFFFFF"
              fillOpacity={0.1}
              activeDot={{
                r: 4, // taille du point au survol
                stroke: "#FFFFFF30", // Bordure semi-transparente
                strokeWidth: 9,
                fill: "#FFFFFF", // Fond blanc
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <h2>Durée moyenne des sessions</h2>
      </div>
  );
}
}

SessionDurationChart.propTypes = {
  /**
   * Données des sessions moyennes.
   * - sessions: Tableau contenant les objets des sessions (day et sessionLength).
   */
  averageSessions: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number.isRequired, // Jour de la session (1-7)
        sessionLength: PropTypes.number.isRequired, // Durée de la session en minutes
      })
    ),
  }),
};
