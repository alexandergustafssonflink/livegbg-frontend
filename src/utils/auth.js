import { jwtDecode } from "jwt-decode";

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token); // Dekrypterar och extraherar `exp`
    const currentTime = Date.now() / 1000; // Nuvarande tid i sekunder

    // Kontrollera om tokenen fortfarande är giltig
    return exp > currentTime;
  } catch (error) {
    console.error("Ogiltig token", error);
    return false;
  }
}
