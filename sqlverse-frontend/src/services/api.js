// src/services/api.js

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const SQLVerseAPI = {

    async createConnection(payload) {
        try {
            const response = await fetch(`${API_BASE_URL}/connections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to connect to database');
            }

            return data;
        } catch (error) {
            console.error("Connection Error (Caught by Service):", error);
            throw error;
        }
    },

    async queryDatabase(connectionId, question) {
        try {
            const response = await fetch(`${API_BASE_URL}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    connection_id: connectionId,
                    question: question
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to execute query');
            }

            return data;
        } catch (error) {
            console.error("Query Error (Caught by Service):", error);
            throw error;
        }
    }
};
