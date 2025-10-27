import React, { useState, ReactNode, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  logUserIn: (user: User) => void
  isLoggedIn: boolean
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  logUserIn: (user: User) => {}
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
    <UserContext.Provider value={{ user, logUserIn, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

