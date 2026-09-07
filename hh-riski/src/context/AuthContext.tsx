import { createContext, useContext, useState } from "react";
import type { User } from "../types";

type UserContextValue = {
	user: User | null,
	token: string | null;
	isAuthenticated: boolean;
	login: (userData: User, userToken: string) => void;
	clearUser: () => void;
}

const AuthContext = createContext<UserContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(() =>
		localStorage.getItem("token")
	);
	const [user, setUser] = useState<User | null>(() => {
		const currentUser = localStorage.getItem("user");
		return currentUser ? JSON.parse(currentUser) : null
	});

	const login = (userData: User, userToken: string) => {
		setUser({
			username: userData.username
		});
		setToken(userToken)
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", JSON.stringify(userToken));
	}

	const clearUser = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};
	return (
		<AuthContext value={{ user, token, isAuthenticated: !!token, login, clearUser }}>
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