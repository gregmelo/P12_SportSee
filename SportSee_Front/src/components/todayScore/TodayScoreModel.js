/**
 * Modélisation des données du score du jour.
 */
export default class TodayScoreModel {
    /**
     * Crée une instance de TodayScoreModel.
     * @param {number} score - Le score brut (entre 0 et 1).
     */
    constructor(score) {
    this.score = score;
    }

    /**
     * Retourne le score en pourcentage.
     * @returns {number} Le score sous forme de pourcentage.
     */
    getScorePercentage() {
        console.log(this.score);
    return this.score * 100;
    }

    /**
     * Retourne les données formatées pour le graphique.
     * @returns {Array} Données à utiliser pour le graphique Recharts.
     */
    getChartData() {
    return [
        { name: 'Score', value: this.score },
        { name: 'Reste', value: 100 - this.score },
    ];
    }
}
