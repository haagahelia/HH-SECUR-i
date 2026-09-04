import { createContext, useContext, useState } from "react";
import type { User } from "../types";

type UserContextValue = {
	user: User | null,
	isAuthenticated: boolean;
	login: (userData: User) => void;
	clearUser: () => void;
}

const AuthContext = createContext<UserContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const login = (userData: User) => {
		setUser(userData);
	}

	const clearUser = () => setUser(null);

	return (
		<AuthContext value={{ user, isAuthenticated: !!user, login, clearUser }}>
			{children}
		</AuthContext>
	)
}

export const useCurrentUser = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error('useCurrentUser must be used within a AuthProvider');
	}
	return ctx;
};