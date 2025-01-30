import axios from "./axios";
import { clearUser, setUser } from "../Redux/reducers/userReducer";

const verifyUser = async (dispatch, location) => {
  try {
    console.log("verifyUser Invoked");
    if(!["/","/auth"].includes(location.pathname)) {
      const response = await axios.get("user/profile"); // Adjust endpoint if needed
      if (response.status === 200) {
        // Set user in Redux if verified
        dispatch(setUser(response?.data?.data));
      }
    }
  } catch (error) {
    console.error("User verification failed:", error);
    // Clear user state and perform logout if verification fails
    await axios.post("auth/logout").catch(() => {});
    dispatch(clearUser());
    localStorage.clear();
    sessionStorage.clear();
  }
};

export default verifyUser;
