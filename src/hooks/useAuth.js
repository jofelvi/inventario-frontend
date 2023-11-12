import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import endPoints from '@services/api/index';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const options = { headers: { Auth: 'ABC123' } };

  const handleResponse = (res) => {
    const token = res.data.token;
    console.log({res})
    localStorage.setItem('token', token);
    console.log(jwt.decode(token));
    setUser(jwt.decode(token));
  };

  const signIn = (email, password) =>
    axios.post(endPoints.auth.login, { email, password }, options).then(handleResponse);

  const createUser = (newUser) =>
    axios.post(endPoints.auth.signUp, newUser, options).then((res)=>{
      handleResponse(res)
      return res
    });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser(jwt.decode(token));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return { user, error, setError, signIn, logout, createUser };
}

export default useProvideAuth;