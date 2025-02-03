import React from "react";
import { useParams } from "react-router-dom";
import { USER_MAIN_DATA } from "../../mock/mockData"; // Importer les données mockées
import "./UserPage.scss";
import TopNav from "../../components/topNav/TopNav";
import LeftNav from "../../components/leftNav/LeftNav";
import PropTypes from "prop-types";
import { useDataType } from "../../context/DataTypeContext";

/**
 * Page utilisateur permettant d'afficher des informations spécifiques à un utilisateur.
 * Le type de données (mock ou API) est récupéré depuis le contexte, et l'utilisateur est récupéré 
 * soit à partir des données mockées, soit via une API.
 * 
 * @returns {JSX.Element} La page avec les informations de l'utilisateur et un message de félicitations.
 */
export default function UserPage() {
    const { userId } = useParams(); // Récupère l'identifiant de l'utilisateur à partir de l'URL
    const { dataType } = useDataType(); // Récupère le type de données depuis le contexte


    // État pour stocker les données de l'utilisateur
    const [user, setUser] = React.useState(null);

    /**
     * Fonction asynchrone pour récupérer les détails d'un utilisateur en fonction du type de données sélectionné.
     * - Si le type est "mock", les données sont extraites depuis les données mockées.
     * - Si le type est "api", une requête est envoyée à une API pour récupérer les informations utilisateur.
     * 
     * @returns {Object|null} Les détails de l'utilisateur ou null si l'utilisateur n'est pas trouvé.
     */
    const fetchUserDetails = async () => {
        // Si le type de données est "mock", on cherche les données dans le fichier mock
        if (dataType === "mock") {
            const userMock = USER_MAIN_DATA.find(user => user.id === parseInt(userId));
            return userMock && userMock.userInfos
                ? { id: userMock.id, firstName: userMock.userInfos.firstName }
                : null;
        } 
        // Si le type de données est "api", on fait une requête vers l'API pour récupérer les données
        else if (dataType === "api") {
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

    /**
     * Fonction qui charge les données de l'utilisateur.
     * Elle appelle `fetchUserDetails` pour obtenir les détails, puis met à jour l'état `user`.
     */
    const loadUserData = async () => {
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
    };

    // Utilise useEffect pour charger les données de l'utilisateur chaque fois que l'ID ou le type de données change
    React.useEffect(() => {
        loadUserData();
    }, [userId, dataType]); // Dépendances : recharge les données uniquement si userId ou dataType changent

    // Affiche un message de chargement tant que les données ne sont pas disponibles
    if (!user) {
        return <div>Loading...</div>;
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
                {/* Affiche le type de données utilisé (mock ou API) */}
                <p>Type de données : {dataType}</p>
            </div>
        </>
    );
}

// Définition des types attendus pour les props (ici, userId et dataType)
UserPage.propTypes = {
    userId: PropTypes.string, // ID de l'utilisateur, passé par l'URL
    dataType: PropTypes.string, // Type de données (mock ou API)
};
