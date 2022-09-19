import { User } from "./user.model";

export interface Profile extends Omit<User, 'token' | 'email'> {
    following: boolean;
}

export interface ProfileResponse {
    profile: Profile;
  }