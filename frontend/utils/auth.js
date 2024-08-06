// Fonction pour décoder le JWT
function decodeJwt(token) {
  if (!token) {
    throw new Error("Token is missing");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Token is malformed");
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  try {
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    throw new Error("Failed to decode base64");
  }
}

export function getUserRole() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = decodeJwt(token);

        return decoded.role;
      } catch (e) {
        console.error("Failed to decode token:", e);
      }
    } else {
      console.warn("No token found");
    }
  }
  return null;
}
