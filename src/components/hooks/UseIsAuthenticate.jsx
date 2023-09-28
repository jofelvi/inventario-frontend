import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export const useIsAuthenticate =()=> {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        console.log("decodedToken", decodedToken)
        setUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return user;
}