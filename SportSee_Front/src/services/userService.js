// import { USE_MOCK_DATA } from '../config';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../mock/mockData';

const API_BASE_URL = 'http://localhost:3000/user';

export const getUserMainData = async (userId, useMockData) => {

    try{
    if (useMockData) {
        const user = USER_MAIN_DATA.find(user => String(user.id) === String(userId));
        if (!user) {
            throw new Error(`Utilisateur avec l'ID ${userId} introuvable dans les données mockées.`);
        }
        return user;
    }else {
        const response = await fetch(`${API_BASE_URL}/${userId}`);
        if (!response.ok) {
            throw new Error(`Erreur lors de l'appel API ${response.status}: ${response.statusText}`);
        }
        const responseData = await response.json(); // Extraire les données JSON
        return responseData.data;
        }
    }catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
    }
};

export const getUserActivity = async (userId, useMockData) => {

    try {
        if (!userId) {
            throw new Error('L\'ID utilisateur est requis.');
        }

        if (useMockData) {
            const userActivity = USER_ACTIVITY.find(activity => String(activity.userId) === String(userId));
            if (!userActivity) {
                throw new Error(`Utilisateur avec l'ID ${userId} introuvable dans les données mockées.`);
            }
            return userActivity;
        } else {
            const response = await fetch(`${API_BASE_URL}/${userId}/activity`);
            if (!response.ok) {
                throw new Error(`Erreur lors de l'appel API (HTTP ${response.status}): ${response.statusText}`);
            }

            const activityData = await response.json(); // Extraction des données JSON
            return activityData.data;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
    }
};


export const getUserAverageSessions = async (userId, useMockData) => {

    try {
        if (!userId) {
            throw new Error('L\'ID utilisateur est requis.');
        }

        if (useMockData) {
            const userAverageSessions = USER_AVERAGE_SESSIONS.find(sessions => String(sessions.userId) === String(userId));
            if (!userAverageSessions) {
                throw new Error(`Utilisateur avec l'ID ${userId} introuvable dans les données mockées.`);
            }
            return userAverageSessions;
        } else {
            const response = await fetch(`${API_BASE_URL}/${userId}/average-sessions`);
            if (!response.ok) {
                throw new Error(`Erreur lors de l'appel API (HTTP ${response.status}): ${response.statusText}`);
            }

            const sessionsDuration = await response.json(); // Extraction des données JSON
            return sessionsDuration.data;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
    }
};

export const getUserPerformance = async (userId, useMockData) => {

    try {
        if (!userId) {
            throw new Error('L\'ID utilisateur est requis.');
        }

        if (useMockData) {
            const userPerformance = USER_PERFORMANCE.find(performance => String(performance.userId) === String(userId));
            if (!userPerformance) {
                throw new Error(`Utilisateur avec l'ID ${userId} introuvable dans les données mockées.`);
            }
            return userPerformance;
        } else {
            const response = await fetch(`${API_BASE_URL}/${userId}/performance`);
            if (!response.ok) {
                throw new Error(`Erreur lors de l'appel API (HTTP ${response.status}): ${response.statusText}`);
            }

            const performanceData = await response.json(); // Extraction des données JSON

            // Normalisation des données API pour correspondre aux données mockées
            const normalizedData = {
                userId: performanceData.data.userId,
                kind: performanceData.data.kind,
                data: performanceData.data.data,
            };

            return normalizedData;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
    }
};