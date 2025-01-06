import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Mock from "../../assets/mock.png";
import API from "../../assets/api.png";
import "../../utils/style/home_selector.scss";
import { useDataType } from "../../context/DataTypeContext";

export default function DataSelector() {
    const { setDataType } = useDataType();

    return (
        <div className="page">
            <img src={Logo} alt="Logo" />
            <p>Veuillez sélectionner un type de données</p>
            <div className="page__options">
                <Link to="/home" onClick={() => setDataType("mock")}>
                    <img src={Mock} alt="Données mockées" />
                    Données Mockées
                </Link>
                <Link to="/home" onClick={() => setDataType("api")}>
                    <img src={API} alt="Données API" />
                    Données API
                </Link>
            </div>
        </div>
    );
}
