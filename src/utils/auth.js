import { jwtDecode } from "jwt-decode";
import { ref } from "vue";

// Skapa en reaktiv variabel för inloggningsstatus
const isLoggedIn = ref(!!localStorage.getItem("token"));

export function checkLoginStatus() {
  const token = localStorage.getItem("token");
  if (!token) {
    isLoggedIn.value = false;
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    isLoggedIn.value = exp > currentTime;
    return isLoggedIn.value;
  } catch (error) {
    console.error("Ogiltig token", error);
    isLoggedIn.value = false;
    return false;
  }
}

export { isLoggedIn };
