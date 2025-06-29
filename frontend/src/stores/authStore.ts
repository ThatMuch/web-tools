import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from '../utils/firebase/firebase'
import { create } from "zustand";

type AuthState = {
	isAuthenticated: boolean;
	login: (email: string, password: string) => void;
	logout: () => void;
	isInitialized: boolean;
	user?: any | null;
	setInitialized: () => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	error?: string | null;
	checkSession: () => void | Promise<void>;
};
// add the environment variables for the backend URL
// and frontend URL to the .env.development file
// and use them in the fetch requests
const url = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create<AuthState>()(

	(set) => ({
		isAuthenticated: false,
		login: async (email: string, password: string) => {
			try {
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				const idToken = await userCredential.user.getIdToken();
				const sessionResponse = await fetch(`${url}/api/session-login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token: idToken }),
				});

				if (!sessionResponse.ok) {
					throw new Error("La création de la session a échoué.");
				}

				set({ isAuthenticated: true, loading: false, user: { email: userCredential.user.email }, error: null });
			} catch (error: any) {
				const errorMessage =
					error.code === "auth/invalid-credential"
						? "Email ou mot de passe incorrect."
						: "Une erreur est survenue.";
				set({ isAuthenticated: false, loading: false, error: errorMessage });
			}
		},
		logout: async () => {

			await signOut(auth); // Déconnexion côté Firebase client
			await fetch(`${url}/api/logout`, { method: "POST" });
			set({ isAuthenticated: false, error: null });
		},
		checkSession: async () => {
			set({ loading: true });
			try {
				const response = await fetch(`${url}/api/session`);
				const data = await response.json();
				set({ isAuthenticated: data.isAuthenticated, loading: false });
			} catch (error) {
				set({ isAuthenticated: false, loading: false });
			}
		},
		user: undefined,
		isInitialized: false,
		setInitialized: () => set({ isInitialized: true }),
		loading: false,
		setLoading: (loading: boolean) => set({ loading }),
	}));

useAuthStore.getState().checkSession();
