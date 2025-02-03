import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/topNav/TopNav';
import LeftNav from '../../components/leftNav/LeftNav';
import './Home.scss';
import Man from '../../assets/img/Man.jpg'; // Image de l'utilisateur 12
import Woman from '../../assets/img/Woman.jpg'; // Image de l'utilisateur 18
import MockIcon from '../../assets/mock.png'; // Icône pour Mock
import ApiIcon from '../../assets/api.png'; // Icône pour API

/**
 * Composant principal de la page d'accueil de l'application.
 * Permet à l'utilisateur de sélectionner le type de données (mockées ou API) 
 * ainsi que l'utilisateur pour lequel afficher le dashboard.
 * 
 * @returns {JSX.Element} Le rendu de la page d'accueil.
 */
export default function Home() {
    // État pour savoir si les données mockées sont activées (par défaut, c'est vrai)
    const [useMockData, setUseMockData] = useState(true);

    // État pour sélectionner l'ID de l'utilisateur (par défaut, utilisateur 12)
    const [selectedUserId, setSelectedUserId] = useState('12');

    // Fonction de navigation pour rediriger vers le dashboard avec les informations stockées
    const navigate = useNavigate();

    /**
     * Gère la navigation vers le dashboard et stocke les paramètres sélectionnés 
     * dans le localStorage pour pouvoir les récupérer sur la page de dashboard.
     */
    const handleNavigation = () => {
        // Stocke dans localStorage si les données mockées ou API sont utilisées
        localStorage.setItem('useMockData', useMockData);

        // Stocke l'ID de l'utilisateur sélectionné
        localStorage.setItem('selectedUserId', selectedUserId);

        // Navigue vers la page du dashboard pour l'utilisateur sélectionné
        navigate(`/user/${selectedUserId}`);
    };

    return (
        <>
            {/* Affichage des barres de navigation */}
            <TopNav />
            <LeftNav />

            <div className="home">
                {/* Titre principal de la page d'accueil */}
                <h1>Bienvenue sur l&apos;application SportSee</h1>

                <div className="page__options">
                    {/* Option pour sélectionner les données mockées */}
                    <div
                        className={`option ${useMockData ? 'active' : ''}`}
                        onClick={() => setUseMockData(true)} // Mise à jour de l'état sur "mock"
                    >
                        <img src={MockIcon} alt="Données mockées" />
                        <span>Données Mockées</span>
                    </div>

                    {/* Option pour sélectionner les données API */}
                    <div
                        className={`option ${!useMockData ? 'active' : ''}`}
                        onClick={() => setUseMockData(false)} // Mise à jour de l'état sur "API"
                    >
                        <img src={ApiIcon} alt="Données API" />
                        <span>Données API</span>
                    </div>
                </div>

                <div className="page__users">
                    {/* Option pour sélectionner l'utilisateur 12 */}
                    <div
                        className={`user ${selectedUserId === '12' ? 'active' : ''}`}
                        onClick={() => setSelectedUserId('12')} // Sélection de l'utilisateur 12
                    >
                        <img src={Man} alt="Utilisateur 12" />
                        <span>Karl</span>
                    </div>

                    {/* Option pour sélectionner l'utilisateur 18 */}
                    <div
                        className={`user ${selectedUserId === '18' ? 'active' : ''}`}
                        onClick={() => setSelectedUserId('18')} // Sélection de l'utilisateur 18
                    >
                        <img src={Woman} alt="Utilisateur 18" />
                        <span>Cécilia</span>
                    </div>
                </div>

                {/* Bouton pour naviguer vers le dashboard avec les options sélectionnées */}
                <button className="navigate-button" onClick={handleNavigation}>
                    Voir le Dashboard
                </button>
            </div>
        </>
    );
}
