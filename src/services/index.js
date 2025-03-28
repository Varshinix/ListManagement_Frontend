
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (data) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        return result;
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        return result;
    } catch (error) {
        console.error("Error during login:", error.message);
        throw error;
    }
};

export const uploads = (imageUrl) => {
    return `${import.meta.env.VITE_BACKEND_URL}/images/${imageUrl}`;
}; 


export const createShortLink = async (data) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/link/shorten`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to create link");
        }

        return result;
    } catch (error) {
        console.error("Error creating link:", error.message);
        throw error;
    }
};
