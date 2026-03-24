import { ref } from "vue";

const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

export function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value);
  applyDarkMode(isDarkMode.value);
}

export function applyDarkMode(value) {
  if (value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export { isDarkMode };
