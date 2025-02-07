/**
 * @file PerformanceModel.js
 * @description Classe de modélisation des performances utilisateur pour transformer et structurer les données.
 */

/**
 * Classe de modélisation des performances utilisateur.
 */
export default class PerformanceModel {
    /**
     * Dictionnaire de traduction des types de performance.
     * @type {Object.<string, string>}
     */
    static kindTranslations = {
    cardio: "Cardio",
    energy: "Énergie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
    };

    /**
     * Ordre prédéfini des types de performance pour l'affichage.
     * @type {string[]}
     */
    static sortOrder = ["Intensité", "Vitesse", "Force", "Endurance", "Énergie", "Cardio"];

    /**
     * Constructeur de la classe PerformanceModel.
     * @param {Object} performanceData - Données brutes des performances utilisateur.
     * @param {Object} performanceData.kind - Dictionnaire des types de performance (mapping ID → libellé).
     * @param {Array} performanceData.data - Tableau des performances avec `kind` (ID) et `value` (valeur numérique).
     * @throws {Error} Lance une erreur si les données sont invalides.
     */
    constructor(performanceData) {
    if (!performanceData || !performanceData.data || !performanceData.kind) {
        throw new Error("Les données de performance sont invalides.");
    }

      // Transformation et tri des données
    this.data = this.formatData(performanceData);
    }

    /**
     * Formate et trie les données de performance.
     * @param {Object} performanceData - Données brutes à formater.
     * @returns {Array} Tableau d'objets contenant `kind` (nom traduit) et `value` (valeur).
     */
    formatData(performanceData) {
    return performanceData.data
        .map((item) => ({
        kind: PerformanceModel.kindTranslations[performanceData.kind[item.kind]] || "Inconnu",
        value: item.value,
        }))
        .sort((a, b) => PerformanceModel.sortOrder.indexOf(a.kind) - PerformanceModel.sortOrder.indexOf(b.kind));
    }
}
