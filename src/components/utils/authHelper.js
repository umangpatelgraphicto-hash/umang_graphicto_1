// utils/authHelper.js 
export const getUserData = () => {
    try {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("userData");
            if (!user) return null; // Return null if user is not found
            return JSON.parse(user);
        }
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null; // Return null if parsing fails
    }
};

export const isUserAuthenticated = () => {
    const user = getUserData();
    return user && user.authToken ? true : false;
};

// utils/tokenHelper.js
export const getToken = () => {
    try {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("userData");
            if (!user) return null; // Return null if user data is not found
            const userData = JSON.parse(user);
            return userData.token || null; // Return the token if it exists
        }
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null; // Return null if an error occurs
    }
};


export const logout = (router) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("userData");
        router.push("/login");
    }
}