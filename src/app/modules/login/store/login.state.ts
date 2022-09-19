import { ApiStatus } from "@shared-app/data-access/models";

export interface LoginState {
    errors: Record<string, string[]>;
    status: ApiStatus;
}