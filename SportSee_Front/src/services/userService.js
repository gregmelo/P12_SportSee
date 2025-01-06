import { USE_MOCK_DATA } from '../config';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../mock/mockData';

const API_BASE_URL = 'http://localhost:3000/user';

export const getUserMainData = async (userId) => {
    console.log('userId: ', userId);
    try{
    if (USE_MOCK_DATA) {
        const user = USER_MAIN_DATA.find(user => String(user.id) === String(userId));
        console.log ('data Mock: ', user);
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
        console.log('data API: ', responseData);
        return responseData.data;
        }
    }catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
    }
};

export const getUserActivity = async (userId) => {
    console.log('Fetching activity for userId: ', userId);

    try {
        if (!userId) {
            throw new Error('L\'ID utilisateur est requis.');
        }

        if (USE_MOCK_DATA) {
            const userActivity = USER_ACTIVITY.find(activity => String(activity.userId) === String(userId));
            console.log('Mock data activity: ', userActivity);
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
            console.log('API data activity: ', activityData);
            return activityData.data;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
    }
};


export const getUserAverageSessions = async (userId) => {
    console.log('Fetching activity for userId: ', userId);

    try {
        if (!userId) {
            throw new Error('L\'ID utilisateur est requis.');
        }

        if (USE_MOCK_DATA) {
            const userAverageSessions = USER_AVERAGE_SESSIONS.find(sessions => String(sessions.userId) === String(userId));
            console.log('Mock data sessions duration: ', userAverageSessions);
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
            console.log('API data sessions duration: ', sessionsDuration);
            return sessionsDuration.data;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        throw error;
    }
};

export const getUserPerformance = async (userId) => {
    if (USE_MOCK_DATA) {
        return USER_PERFORMANCE.find(performance => performance.userId === userId);
    }
    const response = await fetch(`${API_BASE_URL}/${userId}/performance`);
    if (!response.ok) {
        throw new Error('Failed to fetch user performance');
    }
    return await response.json();
};
