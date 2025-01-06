import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import PropTypes from 'prop-types';
import CustomizedTooltip from '../customizedTooltip/CustomizedTooltip';
import './SessionDuration.scss';
import CustomCursor from '../customCursor/CustomCursor';

export default function SessionDuration({averageSessions}){
    console.log('averageSessions in componant: ', averageSessions);

      // Vérification et transformation des données
  const sessionData = averageSessions?.sessions?.map(session => ({
    day: `${session.day}`,
    sessionLength: session.sessionLength,
  })) || [];

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
          tickFormatter={(tick) => ['L', 'M', 'M', 'J', 'V', 'S', 'D'][tick - 1]}
          tick={{ fill: '#ffffff99', fontSize: 12 }}
          padding={{ left: 5, right: 5 }}
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
        <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeWidth={2} // Augmente l'épaisseur
            dot={false} // Supprime les dots fixes
            activeDot={{ r: 8 }} // Conserve les dots au survol
        />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}

SessionDuration.propTypes = {
    averageSessions: PropTypes.object,
    };