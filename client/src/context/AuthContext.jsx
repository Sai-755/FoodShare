import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

const USER_KEY = "foodshare_user";
const TOKEN_KEY = "foodshare_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(USER_KEY) || "null"));
  const [isReady, setIsReady] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const login = useCallback((session) => {
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    setUser(session.user);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) { setIsReady(true); return; }
    authService.me().then((response) => {
      const nextUser = response.user;
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    }).catch(logout).finally(() => setIsReady(true));
  }, [logout]);

  const value = useMemo(() => ({ user, isReady, login, logout, isAuthenticated: Boolean(user) }), [user, isReady, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
