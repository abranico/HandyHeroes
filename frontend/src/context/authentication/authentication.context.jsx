import { createContext, useState } from "react";
// import initialUsers from "../../mocks/Users.json";
import useUsers from "../../hooks/useUsers";
export const AuthenticationContext = createContext();

const USER = JSON.parse(localStorage.getItem("__user__"));

export const AuthenticationContextProvider = ({ children }) => {
  const { users, addUser, loading } = useUsers();

  const [user, setUser] = useState(USER);

  const handleLogin = (email, password) => {
    const selectUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!selectUser) return;

    setUser(selectUser);
    localStorage.setItem("__user__", JSON.stringify(selectUser));
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("__user__");
  };

  const handleRegister = (newUser) => {
    addUser(newUser);
    setUser(newUser);
    return true;
  };

  return (
    <AuthenticationContext.Provider
      value={{ users, user, handleLogin, handleLogout, handleRegister }}
    >
      {!loading && children}
    </AuthenticationContext.Provider>
  );
};
