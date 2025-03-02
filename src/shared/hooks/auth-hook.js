import { useCallback, useEffect, useState } from "react";

let expiryTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();

  const login = useCallback((userId, token, expiration) => {
    setToken(token);
    setUserId(userId);
    const tokenExpirationTime = expiration || Date.now() + 1000 * 60 * 60;
    setTokenExpirationTime(tokenExpirationTime);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId, token, tokenExpirationTime })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
  }, []);

  //This useEffect is for auto logout functionality
  useEffect(() => {
    token && tokenExpirationTime > Date.now()
      ? (expiryTimer = setTimeout(logout, tokenExpirationTime - Date.now()))
      : clearTimeout(expiryTimer);
  }, [token, logout, tokenExpirationTime]);

  //This useEffect is for auto login functionality
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData?.token && storedData.tokenExpirationTime > Date.now()) {
      login(
        storedData.userId,
        storedData.token,
        storedData.tokenExpirationTime
      );
    }
  }, [login]);

  return { login, logout, token, userId };
};
