import React, { useState, useContext, createContext, useEffect } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import endPoints from '@services/api/index';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const API_KEY = 'ABC123';
  const options = {
    headers: {
      Auth: API_KEY,
    },
  };

  const signIn = async (email, password) => {
    const res = await axios.post(endPoints.auth.login, { email, password }, options);
    console.log({ res });
    if (res) {
      const token = res.data.token;
      try {
        localStorage.setItem('token', token);
        const decodedToken = jwt.decode(token);
        console.log({decodedToken})// Decodifica el token
        setUser(decodedToken);
      } catch (error) {
        setUser(null);
      }
    }
  };

  const createUser = async (newUser) => {
    try {
      const response = await axios.post(endPoints.auth.signUp2, newUser, options);
      if (response.status === 201) {
        const { message, token, usuario } = response.data;
        localStorage.setItem('token', token);
        const decodedToken = jwt.decode(token); // Decodifica el token
        setUser(decodedToken);
        return response.data;
      }
      console.log('no entro');
    } catch (error) {
      throw new Error(error.response.data.errors[0].msg);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwt.decode(storedToken);
      setUser(decodedToken);
    }
  }, []);

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.authorization;
    window.location.href = '/';
  };

  return {
    user,
    error,
    setError,
    signIn,
    logout,
    createUser,
  };
}

export default useProvideAuth;