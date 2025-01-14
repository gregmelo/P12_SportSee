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

export default function Dashboard() {
    const { id } = useParams(); // userId récupéré depuis l'URL
    console.log("userId: ", id);
    const [userData, setUserData] = useState(null);
    const [userActivity, setUserActivity] = useState(null);
    const [todayScore, setTodayScore] = useState(null);
    const [error, setError] = useState(null);
    const [averageSessions, setAverageSessions] = useState(null);
    const [performanceData, setUserPerformance] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserMainData(id);
                setUserData(data);
                console.log("data dashboard: ", data);
                const activityData = await getUserActivity(id);
                const todayScore = data.score || data.todayScore;
                setTodayScore(todayScore);
                console.log("todayScore: ", todayScore);
                const averageSessions = await getUserAverageSessions(id);
                setAverageSessions(averageSessions);
                console.log("averageSessions: ", averageSessions);
                // Transformation si nécessaire
                const transformedSessions = activityData.sessions.map((session, index) => ({
                ...session,
                day: `Jour ${index + 1}`, // Par exemple, changer "2023-12-25" en "Jour 1"
            }));
            
            setUserActivity({ ...activityData, sessions: transformedSessions });
            console.log("transformedSessions: ", transformedSessions);
            const performanceData = await getUserPerformance(id);
            setUserPerformance(performanceData);
        } catch (err) {
            setError('Une erreur est survenue lors du chargement des données.');
            console.error(err);
        }
        };
    
        fetchData();
    }, [id]);

    
    return (
        <>
            <TopNav />
            <LeftNav />
                {error ? (
                    <p>{error}</p>
                ) : userData ? (
            <div className="dashboard">
                    <div className="header">
                        <h1>
                            Bonjour <span>{userData.userInfos.firstName}</span>
                        </h1>
                        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                    </div>
                    <div className="graph-1">
                    <ActivityBarchart sessions={userActivity ? userActivity.sessions : []}/>
                    </div>
                    <div className="graph-2"><SessionDurationChart averageSessions={averageSessions}/></div>
                    <div className="graph-3"><PerformanceChart performanceData={performanceData}/></div>
                    <div className="graph-4"><TodayScore todayScore={todayScore}/></div>
                    <div className="graph-5">
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
                    <p>Chargement des données...</p>
                )}
        </>
    );
}