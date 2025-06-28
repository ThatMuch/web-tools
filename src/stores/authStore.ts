import { createJSONStorage, persist } from "zustand/middleware";

import { auth } from '../utils/firebase/firebase'
import { create } from "zustand";
import type firebase from "firebase/compat/app";
import { signInWithEmailAndPassword } from '@firebase/auth'

type AuthState = {
	isAuthenticated: boolean;
	login: (email: string, password: string) => void;
	logout: () => void;
	isInitialized: boolean;
	user?: firebase.User | null;
	setInitialized: () => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			login: async (email: string, password: string) => {
				try {
					await signInWithEmailAndPassword(auth, email, password);
					set({ isAuthenticated: true });
				} catch (error) {
					console.error("Login failed:", error);
				}
			},
			logout: () => set({ isAuthenticated: false }),
			user: undefined,
			isInitialized: false,
			setInitialized: () => set({ isInitialized: true }),
			loading: false,
			setLoading: (loading: boolean) => set({ loading }),
		}),
		{
			name: "auth-storage", // unique name for storage
			storage: createJSONStorage(() => sessionStorage), // use sessionStorage
		}
	)
);
