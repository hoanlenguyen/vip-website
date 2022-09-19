import { ApiStatus } from "@shared-app/data-access/models";

export interface FirstTimeLoginState {
    errors: Record<string, string[]>;
    status: ApiStatus;
}