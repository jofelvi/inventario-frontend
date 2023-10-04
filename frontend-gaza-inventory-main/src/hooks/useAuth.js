import React, { useState, useContext, createContext, useEffect, useCallback } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
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
      Auth: API_KEY
    },
  };
  const fetchUser = useCallback(async () => {
    try {
      const token = Cookie.get('token');

      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios.get(endPoints.auth.profile);

        setUser(user);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  const singIn = async (email, password) => {

    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    console.log({access_token})
    if (access_token) {
      const token = access_token.access_toker;
      Cookie.set('token', token, { expires: 5 });

      try {
        await fetchUser();
      } catch (error) {
        setUser(null);
      }
    }
  };

  const createUser = async (newUser) => {
    try {
      const { data: access_token } = await axios.post(endPoints.auth.signUp, newUser, options);
      if (access_token) {
        const token = access_token.access_toker;
        Cookie.set('token', token, { expires: 5 });

        await fetchUser();
      }
    } catch (error) {
      throw new Error('Ha ocurrido un error al crear el usuario.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.authorization;
    window.location.href = '/'
  }

  return {
    user,
    error,
    setError,
    singIn,
    logout,
    createUser
  };

}
