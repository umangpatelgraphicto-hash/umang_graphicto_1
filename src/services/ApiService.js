import { getToken } from "../components/utils/authHelper";


const apiService = {
    async getData(endpoint) {
        try {
            const response = await fetch(`${endpoint}`);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
    async getDataWithToken(endpoint) {
        try {
            if (typeof window !== 'undefined') {
                const token = getToken();
                ; // Retrieve token from local storage
                const headers = {};

                // Include Bearer token in headers if it exists
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const response = await fetch(`${endpoint}`, {
                    method: "GET",
                    headers: headers, // Add headers to the GET request
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return await response.json();
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    async postData(endpoint, data) {
        try {
            if (typeof window !== 'undefined') {
                const token = getToken(); // Replace 'your_token_key' with the actual key used to store the token
                const headers = {};
                // Include Bearer token in headers if it exists
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
                let body;
                if (data instanceof FormData) {
                    // If data is FormData, do not set Content-Type as it will be set automatically
                    body = data;
                } else {
                    // Assume data is JSON
                    headers["Content-Type"] = "application/json";
                    body = JSON.stringify(data);
                }

                const response = await fetch(`${endpoint}`, {
                    method: "POST",
                    headers: headers,
                    body: body,
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return await response.json();
            }
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    },

    async deleteData(endpoint, id) {
        try {
            if (typeof window !== 'undefined') {
                const token = getToken();
                const headers = {};

                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const response = await fetch(`${endpoint}?id=${id}`, {
                    method: "DELETE",
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return await response.json();
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }

    // Add more methods as needed (PUT, DELETE, etc.)
};

export default apiService;
