import './ActivityBarchart.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import { BsDot } from "react-icons/bs";
import CustomizedTooltip from '../customizedTooltip/CustomizedTooltip';


export default function ActivityBarchart({ sessions }) {
    if (!sessions || sessions.length === 0) {
        return <p>Aucune donnée à afficher.</p>; // Message en cas de données absentes
    }

    console.log('sessions: ', sessions);

    // Calcul des limites min et max pour les poids
    const minWeight = Math.min(...sessions.map(session => session.kilogram));
    const maxWeight = Math.max(...sessions.map(session => session.kilogram));

    return (
    <div className="activity-barchart">
    <div className="activity-barchart__header">
        <h2>Activité quotidienne</h2>
        <div className="activity-barchart__legend">
            <div className="weight">
                <BsDot className='weight-dot'/>
                <p>Poids (kg)</p>
            </div>
            <div className="calories">
                <BsDot className='calories-dot'/>
                <p>Calories (kCal)</p>
            </div>
        </div>
        </div>
        <div className="activity-barchart__content">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            data={sessions}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="day" tickFormatter={(value, index) => index + 1} tickLine={false}/>
                <YAxis 
                yAxisId="Poids"
                orientation='right'
                axisLine={false}
                tickLine={false}
                domain={[minWeight - 1, maxWeight + 1]}
                tickCount={maxWeight - minWeight + 3}
                interval={0}
                />
                <YAxis
                yAxisId="Calories"
                orientation='left'
                hide={true}
                />
                <Tooltip content={<CustomizedTooltip numberOfValues={2} />}/>
                <Bar dataKey="kilogram" yAxisId="Poids"  fill="#282D30" barSize={7} radius={[3, 3, 0, 0]}/>
                <Bar dataKey="calories" yAxisId="Calories" fill="#ff0101" barSize={7} radius={[3, 3, 0, 0]}/>
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
    );
  }

    ActivityBarchart.propTypes = {
        sessions: PropTypes.arrayOf(
            PropTypes.shape({
                day: PropTypes.string,
                kcal: PropTypes.number,
                kg: PropTypes.number,
            })
        ),
    };