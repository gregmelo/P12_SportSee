import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Mock from "../../assets/mock.png";
import API from "../../assets/api.png";
import "../../utils/style/home_selector.scss";
import { useDataType } from "../../context/DataTypeContext";

/**
 * Composant DataSelector permettant à l'utilisateur de choisir le type de données
 * (mockées ou provenant d'une API) à utiliser sur la page d'accueil.
 * Ce composant affiche deux options de sélection avec des images et redirige
 * vers la page d'accueil en fonction du type de données sélectionné.
 * 
 * @returns {JSX.Element} Le rendu du composant DataSelector.
 */
export default function DataSelector() {
    // Utilisation du contexte pour définir le type de données sélectionné
    const { setDataType } = useDataType();

    return (
        <div className="page">
            {/* Affichage du logo */}
            <img src={Logo} alt="Logo" />
            <p>Veuillez sélectionner un type de données</p>

            {/* Bloc contenant les options de sélection */}
            <div className="page__options">
                {/* Lien pour sélectionner les données mockées */}
                <Link to="/home" onClick={() => setDataType("mock")}>
                    <img src={Mock} alt="Données mockées" />
                    Données Mockées
                </Link>

                {/* Lien pour sélectionner les données provenant de l'API */}
                <Link to="/home" onClick={() => setDataType("api")}>
                    <img src={API} alt="Données API" />
                    Données API
                </Link>
            </div>
        </div>
    );
}
