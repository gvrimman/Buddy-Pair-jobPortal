import axios from "./axios";
import { clearUser, setUser } from "../Redux/reducers/userReducer";

const verifyUser = async (dispatch) => {
  try {
    const response = await axios.get("user/profile"); // Adjust endpoint if needed
    if (response.status === 200) {
      // Set user in Redux if verified
      dispatch(setUser(response?.data?.data));
    }
  } catch (error) {
    console.error("User verification failed:", error);
    // Clear user state and perform logout if verification fails
    dispatch(clearUser());
    localStorage.clear();
    sessionStorage.clear();
  }
};

export default verifyUser;