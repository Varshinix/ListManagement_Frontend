{/*import axios from "axios"; */}

{/*const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status === 200 || response.status === 400) {
        return response.json()
    }
    throw new Error('Something went wrong')
} */}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (data) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        return result;
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error;
    }
};

export const uploads = (imageUrl) => {
    return `${BACKEND_URL}/images/${imageUrl}`;
};