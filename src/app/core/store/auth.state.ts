import { User } from "@shared-app/data-access/models";

export interface AuthState {
    user: User | null;
    status: AuthStatus;
}

export type AuthStatus = "idle" | "authenticated" | "unauthenticated";