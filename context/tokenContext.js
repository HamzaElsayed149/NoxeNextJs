"use client";
import React, { createContext, useState, useEffect } from 'react';

export const tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token'); 
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}
