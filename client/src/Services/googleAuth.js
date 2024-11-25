export default function handleGoogleAuthentication() {
    try {
      window.open("http://localhost:3000/api/auth/google", "_self");
    } catch (error) {
      console.error("Google Authentication error", error);
    }
  }
  