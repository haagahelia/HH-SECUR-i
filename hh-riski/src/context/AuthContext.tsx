import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types";

export const AUTH_EXPIRED_EVENT = "auth:expired";

type UserContextValue = {
	user: User | null,
	token: string | null;
	isAuthenticated: boolean;
	sessionExpired: boolean;
	login: (userData: User, userToken: string) => void;
	clearUser: () => void;
}

const AuthContext = createContext<UserContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [sessionExpired, setSessionExpired] = useState(false);
	const [token, setToken] = useState<string | null>(() => {
		const t = localStorage.getItem("token");
		try {
			return t ? t : null;
			//return t ? JSON.parse(testToken) : null;
		} catch (error) {
			console.log(`Error parsing token ${t}`)
			return null;
		}
	});

	const [user, setUser] = useState<User | null>(() => {
		const currentUser = localStorage.getItem("user");
		return currentUser ? JSON.parse(currentUser) : null
	});

	const login = (userData: User, userToken: string) => {
		setSessionExpired(false);
		setUser({
			username: userData.username
		});
		setToken(userToken)
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", (userToken));
	}

	const clearUser = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	useEffect(() => {
		const handleSessionExpired = () => {
			setUser(null);
			setToken(null);
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			setSessionExpired(true);
		};

		window.addEventListener(AUTH_EXPIRED_EVENT, handleSessionExpired);
		return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleSessionExpired);
	}, []);

	return (
		<AuthContext value={{ user, token, isAuthenticated: !!token, sessionExpired, login, clearUser }}>
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