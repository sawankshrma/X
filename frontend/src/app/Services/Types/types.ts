export interface signupParams {
    username: string;
    email: string;
    password: string;
    profilePicUrl?: string;
}

export type loginParams = Pick<signupParams, 'username' | 'password'>