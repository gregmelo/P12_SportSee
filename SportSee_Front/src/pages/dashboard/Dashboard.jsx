import './Dashboard.scss';
import TopNav from '../../components/topNav/TopNav';
import LeftNav from '../../components/leftNav/LeftNav';
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from '../../services/userService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActivityBarchart from '../../components/activityBarchart/ActivityBarchart';
import TodayScore from '../../components/todayScore/TodayScore';
import SessionDurationChart from '../../components/sessionDurationChart/SessionDurationChart';
import PerformanceChart from '../../components/performanceChart/PerformanceChart';
import NutritionCard from '../../components/NutritionCard/NutritionCard';
import chickenIcon from '../../assets/nutrition_icons/chicken.png';
import appleIcon from '../../assets/nutrition_icons/apple.png';
import energyIcon from '../../assets/nutrition_icons/energy.png';
import cheeseburgerIcon from '../../assets/nutrition_icons/cheeseburger.png';
import Error from '../errors/Errors';
import TodayScoreModel from '../../components/todayScore/TodayScoreModel';

/**
 * Composant principal du Dashboard.
 * Affiche les informations de l'utilisateur, ses graphiques et ses données de nutrition.
 *
 * @returns {JSX.Element} Le composant du Dashboard.
 */
export default function Dashboard() {
    const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
    const [useMockData] = useState(() => localStorage.getItem('useMockData') === 'true'); // Vérifie si les données de mock sont activées
    const [userData, setUserData] = useState(null); // Stocke les informations de l'utilisateur
    const [userActivity, setUserActivity] = useState(null); // Stocke les données d'activité de l'utilisateur
    const [todayScore, setTodayScore] = useState(null); // Stocke le score du jour
    const [averageSessions, setAverageSessions] = useState(null); // Stocke les sessions moyennes
    const [performanceData, setUserPerformance] = useState(null); // Stocke les données de performance
    const [error, setError] = useState(false); // Indicateur d'erreur
    const [loading, setLoading] = useState(true); // Indicateur de chargement

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération des données principales de l'utilisateur
                const data = await getUserMainData(id, useMockData);
                if (!data) throw new Error('Utilisateur non trouvé');
                setUserData(data);
    
                // Récupération des données d'activité de l'utilisateur
                const activityData = await getUserActivity(id, useMockData);
                setTodayScore(new TodayScoreModel(data.score || data.todayScore));
    
                // Récupération des sessions moyennes
                const averageSessions = await getUserAverageSessions(id, useMockData);
                setAverageSessions(averageSessions);
    
                // Transformation des sessions d'activité pour afficher le jour
                const transformedSessions = activityData.sessions.map((session, index) => ({
                    ...session,
                    day: `Jour ${index + 1}`,
                }));
                setUserActivity({ ...activityData, sessions: transformedSessions });
    
                // Récupération des données de performance
                const performanceData = await getUserPerformance(id, useMockData);
                setUserPerformance(performanceData);
    
                setLoading(false); // Désactive l'état de chargement une fois les données récupérées
            } catch (err) {
                console.error(err);
                setError(true); // Active l'état d'erreur en cas d'échec
                setLoading(false); // Désactive l'état de chargement même en cas d'erreur
            }
        };
    
        fetchData();
    }, [id, useMockData]); // Déclenche le useEffect chaque fois que l'id ou useMockData change

    return (
        <>
            <TopNav /> {/* Barre de navigation en haut */}
            <LeftNav /> {/* Barre de navigation à gauche */}
            {loading ? (
                <div className="loading">Chargement des données...</div> // Message de chargement
            ) : error ? (
                <Error /> // Affiche la page d'erreur si une erreur survient
            ) : userData ? (
                <div className="dashboard">
                    <div className="header">
                        <h1>
                            Bonjour <span>{userData.userInfos.firstName}</span> {/* Affichage du prénom de l'utilisateur */}
                        </h1>
                        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p> {/* Message de félicitations */}
                    </div>
                    <div className="graph-1">
                        {/* Graphique de l'activité de l'utilisateur */}
                        <ActivityBarchart sessions={userActivity ? userActivity.sessions : []} />
                    </div>
                    <div className="graph-2">
                        {/* Graphique des durées de session */}
                        <SessionDurationChart averageSessions={averageSessions} />
                    </div>
                    <div className="graph-3">
                        {/* Graphique des performances */}
                        <PerformanceChart performanceData={performanceData} />
                    </div>
                    <div className="graph-4">
                        {/* Affichage du score du jour */}
                        <TodayScore todayScore={todayScore.score} />
                    </div>
                    <div className="graph-5">
                        {/* Affichage des données nutritionnelles */}
                        {[
                            {
                                icon: energyIcon,
                                value: `${userData.keyData.calorieCount.toLocaleString('en-EN')}kCal`,
                                label: "Calories",
                                bgColor: "#FBEAEA"
                            },
                            {
                                icon: chickenIcon,
                                value: `${userData.keyData.proteinCount}g`,
                                label: "Protéines",
                                bgColor: "#e9f4fb"
                            },
                            {
                                icon: appleIcon,
                                value: `${userData.keyData.carbohydrateCount}g`,
                                label: "Glucides",
                                bgColor: "#FAF6E5"
                            },
                            {
                                icon: cheeseburgerIcon,
                                value: `${userData.keyData.lipidCount}g`,
                                label: "Lipides",
                                bgColor: "#FBEAEF"
                            }
                        ].map((cardData, index) => (
                            <NutritionCard
                                key={index}
                                icon={cardData.icon}
                                value={cardData.value}
                                label={cardData.label}
                                bgColor={cardData.bgColor}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Chargement des données...</p> // Message de chargement
            )}
        </>
    );
}
