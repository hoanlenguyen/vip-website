import { ApiStatus } from "@shared-app/data-access/models";

export interface ForgetPasswordState {
    errors: Record<string, string[]>;
    status: ApiStatus;
}