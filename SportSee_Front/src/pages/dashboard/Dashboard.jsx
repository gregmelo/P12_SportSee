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
                    <div className="graph-5">Graph 5</div>
            </div>
                ) : (
                    <p>Chargement des données...</p>
                )}
        </>
    );
}



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/logo.png";
// import Woman from "../../assets/img/Woman.jpg";
// import Man from "../../assets/img/Man.jpg";
// import { USER_MAIN_DATA } from "../../mock/mockData";
// import "../../utils/style/home_selector.scss";
// import { useDataType } from "../../context/DataTypeContext";

// const portraits = {
//     18: Woman,
//     12: Man,
// };

// export default function Home() {
//     const { dataType } = useDataType();
//     console.log("dataType: ", dataType);
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (dataType === "api") {
//                 try {
//                     const response = await fetch(`http://localhost:3000/user`);
//                     const data = await response.json();
//                     // Transformez les données API pour correspondre au format attendu
//                     const formattedData = data.map(user => ({
//                         id: user.id,
//                         name: `${user.userInfos.firstName} ${user.userInfos.lastName}`,
//                     }));
//                     setUsers(formattedData);
//                 } catch (error) {
//                     console.error("Erreur lors de la récupération des données API :", error);
//                 }
//             } else {
//                 // Utilisation des données mockées
//                 const formattedData = USER_MAIN_DATA.map(user => ({
//                     id: user.id,
//                     name: `${user.userInfos.firstName} ${user.userInfos.lastName}`,
//                 }));
//                 setUsers(formattedData);
//             }
//         };

//         fetchData();
//     }, [dataType]);

//     return (
//         <div className="page">
//             <img src={Logo} alt="Logo" />
//             <p>Veuillez sélectionner un utilisateur</p>
//             <div className="page__options">
//                 {users.map((user) => (
//                     <Link key={user.id} to={{
//                         pathname: `/user/${user.id}`,
//                         state: { type: dataType }
//                         }}>
//                         <img src={portraits[user.id]} alt={`Portrait de ${user.name}`} />
//                         {user.name}
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }


