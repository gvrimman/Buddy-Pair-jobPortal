import axios from "./axios";

const FetchCSRFToken = async() => {
    try {
        await axios.get('csrf-token');
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }
};

export default FetchCSRFToken;
