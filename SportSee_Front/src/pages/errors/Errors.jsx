/**
 * Composant Errors
 * 
 * Ce composant affiche une page d'erreur 404 lorsque l'utilisateur
 * tente d'accéder à une route qui n'existe pas.
 * 
 * @module Errors
 */

import './Errors.scss';

/**
 * Fonction principale du composant Errors.
 *
 * Ce composant retourne une structure HTML simple indiquant une erreur 404,
 * un message expliquant que la page demandée n'existe pas et, éventuellement, peut être amélioré pour inclure un lien de redirection vers la page d'accueil.
 *
 * @returns {JSX.Element} - Un composant contenant un message d'erreur et un code d'erreur 404.
 */
export default function Errors() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oups! La page que vous demandez n&apos;existe pas.</p>
    </div>
  );
}