'use client';
import React, { useContext, useEffect, useState } from 'react';
import { tokenContext } from '../../context/tokenContext';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(tokenContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setIsLoading(false);
      } else {
        router.push('/login');
      }
    };

    checkToken();
  }, [token, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
