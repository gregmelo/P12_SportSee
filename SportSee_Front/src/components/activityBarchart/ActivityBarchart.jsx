import './ActivityBarchart.scss';
import { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import { BsDot } from "react-icons/bs";
import CustomizedTooltip from '../customizedTooltip/CustomizedTooltip';

/**
 * Composant React affichant un graphique en barres représentant l'activité quotidienne d'un utilisateur.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.sessions - Liste des sessions d'activité de l'utilisateur. 
 * Chaque session contient le jour, les calories consommées et le poids de l'utilisateur.
 * @returns {JSX.Element} Le composant graphique d'activité ou un message si les données sont absentes.
 */
export default class ActivityBarchart extends Component {
    render() {
        const { sessions } = this.props;
    // Vérifie si les données sont absentes ou vides, et retourne un message d'information dans ce cas.
    if (!sessions || sessions.length === 0) {
        return <p>Aucune donnée à afficher.</p>; // Message en cas de données absentes
    }


    // Calcul des limites min et max pour les poids afin de configurer correctement l'axe Y.
    const minWeight = Math.min(...sessions.map(session => session.kilogram));
    const maxWeight = Math.max(...sessions.map(session => session.kilogram));

    return (
        <div className="activity-barchart">
            {/* En-tête du graphique avec titre et légende */}
            <div className="activity-barchart__header">
                <h2>Activité quotidienne</h2>
                <div className="activity-barchart__legend">
                    {/* Légende pour le poids */}
                    <div className="weight">
                        <BsDot className='weight-dot' />
                        <p>Poids (kg)</p>
                    </div>
                    {/* Légende pour les calories */}
                    <div className="calories">
                        <BsDot className='calories-dot' />
                        <p>Calories (kCal)</p>
                    </div>
                </div>
            </div>
            {/* Contenu du graphique */}
            <div className="activity-barchart__content">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sessions}>
                        {/* Grille cartésienne pour un affichage clair */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        {/* Axe X configuré pour afficher les jours */}
                        <XAxis
                            dataKey="day"
                            tickFormatter={(value, index) => index + 1} // Transforme les jours en index
                            tickLine={false}
                            tick={{ fontSize: 14, fill: '#9B9EAC' }}
                        />
                        {/* Axe Y pour le poids, aligné à droite */}
                        <YAxis
                            yAxisId="Poids"
                            orientation='right'
                            axisLine={false}
                            tickLine={false}
                            domain={[minWeight - 1, maxWeight + 1]} // Définit la plage dynamique
                            tickCount={maxWeight - minWeight + 3} // Nombre de graduations
                            interval={0}
                            tick={{ fontSize: 14, fill: '#9B9EAC' }}
                        />
                        {/* Axe Y pour les calories, caché car inutile dans l'interface */}
                        <YAxis
                            yAxisId="Calories"
                            orientation='left'
                            hide={true}
                        />
                        {/* Infobulle personnalisée pour afficher les détails des sessions */}
                        <Tooltip content={<CustomizedTooltip numberOfValues={2} />} />
                        {/* Barres représentant le poids */}
                        <Bar dataKey="kilogram" yAxisId="Poids" fill="#282D30" barSize={7} radius={[3, 3, 0, 0]} />
                        {/* Barres représentant les calories */}
                        <Bar dataKey="calories" yAxisId="Calories" fill="#ff0101" barSize={7} radius={[3, 3, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
}

// Validation des types des props avec PropTypes
ActivityBarchart.propTypes = {
    sessions: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired, // Jour de la session
            kilogram: PropTypes.number.isRequired, // Poids (kg) de l'utilisateur
            calories: PropTypes.number.isRequired, // Calories consommées
        })
    ).isRequired,
};

