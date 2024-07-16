const API_URL = "http://localhost:8000/users";
const TOKEN = JSON.parse(localStorage.getItem("__user__"))?.accessToken;

export const getAllUsers = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${API_URL}?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
};
