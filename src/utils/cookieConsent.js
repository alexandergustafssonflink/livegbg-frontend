const STORAGE_KEY = "cookieConsent";

/**
 * Returns the current consent state: "accepted", "rejected", or "unset".
 */
export function getConsent() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "rejected") return value;
    return "unset";
  } catch {
    return "unset";
  }
}

/**
 * Persists the consent decision to localStorage.
 * @param {"accepted"|"rejected"} value
 */
export function setConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable – value is still applied in memory via the banner component
  }
}
