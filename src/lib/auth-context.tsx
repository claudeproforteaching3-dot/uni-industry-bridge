'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'super_admin' | 'department' | 'industry' | 'student';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({
  role: 'industry',
  setRole: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('industry');

  // Persist role in localStorage for demo purposes
  useEffect(() => {
    const saved = localStorage.getItem('unibridge_role');
    if (saved) {
      setRole(saved as UserRole);
    }
  }, []);

  const updateRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('unibridge_role', newRole);
  };

  return (
    <AuthContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
