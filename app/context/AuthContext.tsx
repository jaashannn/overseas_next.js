// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// type AuthContextType = {
//   isLoggedIn: boolean;
//   login: () => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check localStorage for authentication state on initial load
//   useEffect(() => {
//     const storedAuth = localStorage.getItem('isLoggedIn');
//     if (storedAuth === 'true') {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem('isLoggedIn', 'true'); // Store in localStorage
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('isLoggedIn'); // Remove from localStorage
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }