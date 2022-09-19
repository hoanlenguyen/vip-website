export interface User {
    username?: string;
    full_name?: string
    email?: string;
    image?: string;
    bio?: string;
    token?: string;
    point?: number
}

export interface UserLoginResponse {
    success: boolean,
    message: string,
    detail: any,
    data: {
        user_info: User,
        token_type: "Bearer",
        token: string
    }
}

export interface UserLogin {
    email: string; //Include Email
    password: string
}

export interface UserFirstTimeLogin {
    email: string;
    password: string;
    confirm_password: string;
    security_code: string;
}

export interface UserResponse {
    user: User;
}

export type UserSetting = User; 

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

