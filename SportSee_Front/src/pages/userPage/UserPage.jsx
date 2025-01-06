// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';

// export default function UserPage() {
//   const { userId } = useParams(); // Récupère l'identifiant de l'utilisateur à partir de l'URL

//   return (
//     <div className="user-page">
//       <h1>Page utilisateur {userId}</h1>
//     </div>
//   );
// }

// UserPage.propTypes = {
//   userId: PropTypes.string,
// };

import React from "react";
import { useParams } from "react-router-dom";
import { USER_MAIN_DATA } from "../../mock/mockData"; // Importer les données mockées
import "./UserPage.scss";
import TopNav from "../../components/topNav/TopNav";
import LeftNav from "../../components/leftNav/LeftNav";
import PropTypes from "prop-types";
import { useDataType } from "../../context/DataTypeContext";

export default function UserPage() {
    const { userId } = useParams(); // Récupère l'identifiant de l'utilisateur à partir de l'URL
    const { dataType } = useDataType();
    console.log("data Type: ", dataType);

    // Charger les données utilisateur
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const fetchUserDetails = async () => {
            if (dataType === "mock") {
                const userMock = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
                return userMock && userMock.userInfos
                    ? { id: userMock.id, firstName: userMock.userInfos.firstName }
                    : null;
            } else if (dataType === "api") {
                try {
                    const response = await fetch(`http://localhost:3000/user/${userId}`);
                    const data = await response.json();
                    if (data && data.data && data.data.userInfos) {
                        return { id: data.data.id, firstName: data.data.userInfos.firstName };
                    } else {
                        console.error("Données utilisateur manquantes dans la réponse de l'API.");
                        return null;
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                    return null;
                }
            }
            return null;
        };

        const loadUserData = async () => {
            const userDetails = await fetchUserDetails();
            setUser(userDetails);
        };

        loadUserData();
    }, [userId, dataType]); // Recharger uniquement si userId ou dataType change

    if (!user) {
        return <div>Loading...</div>; // Afficher un chargement tant que les données ne sont pas disponibles
    }

    return (
        <>
            <TopNav />
            <LeftNav />
            <div className="user-page">
                <div className="header">
                    <h1>
                        Bonjour <span>{user.firstName}</span>
                    </h1>
                    <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                </div>
                <p>Type de données : {dataType}</p>
            </div>
        </>
    );
}

UserPage.propTypes = {
    userId: PropTypes.string,
    dataType: PropTypes.string,
};

