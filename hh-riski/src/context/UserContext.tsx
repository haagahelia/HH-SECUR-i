// import { createContext, useContext, useState } from 'react';
// import type { User } from '../types';

// const testUsers: User[] = [
//   { id: '1', username: 'User', isAdmin: false },
//   { id: '2', username: 'Admin', isAdmin: true },
// ];

// type UserContextValue = {
//   user: User | null;
//   setUserById: (id: string) => void;
//   clearUser: () => void;
//   testUsers: User[];
// };

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const setUserById = (id: string) => {
//     const foundUser = testUsers.find(u => u.id === id) ?? null;
//     setUser(foundUser);
//   };

//   const clearUser = () => setUser(null);

//   return (
//     <UserContext.Provider value={{ user, setUserById, clearUser, testUsers }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useCurrentUser = () => {
//   const ctx = useContext(UserContext);
//   if (!ctx) {
//     throw new Error('useCurrentUser must be used within a UserProvider');
//   }
//   return ctx;
// };