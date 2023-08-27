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
        console.log("llamado api me")
        const { data: user } = await axios.get(endPoints.auth.me) ;
        setUser(user);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  const singIn = async (email, password) => {

    const res = await axios.post(endPoints.auth.login, { email, password }, options);
    console.log({res})
    if (res) {
      const token = res.data.token;
      try {
        Cookie.set('token', token, { expires: 5 });
        setUser(res.data.usuario);
      } catch (error) {
        setUser(null);
      }
    }
  };

  const createUser = async (newUser) => {
    try {
      
      const response = await axios.post(endPoints.auth.signUp2, newUser, options);
      console.log("antes de entrar");
      if (response.status === 201) {
        console.log("entro");
        console.log("---------------------")
        const {message, token, usuario} = response.data
        console.log("---------------------", usuario)
        console.log("---------------------")
        Cookie.set('token', token, { expires: 5 });
        setUser(usuario);
        //await fetchUser();
        return response.data; 
      }
      console.log("no entro");
      
    } catch (error) {
      throw new Error(error.response.data.errors[0].msg);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log({user})
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
