import React, { useState, ReactNode, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  logUserIn: (user: User) => void
  logUserOut: () => void
  isLoggedIn: boolean
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  logUserIn: (user: User) => {},
  logUserOut: () => {}
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const logUserIn = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);

    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
  }


  const logUserOut = () => {
    setUser(null);
    setIsLoggedIn(false);

    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, logUserIn, isLoggedIn, logUserOut }}>
      {children}
    </UserContext.Provider>
  );
};

