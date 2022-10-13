import { axios } from '@stdio/core/libs/custom-axios';

import { API_URL } from '@stdio/configs/config';

const AUTH_URL = `${API_URL}/auth`;

export interface LoginForm {
    email: string;
    password: string;
}

export interface SocialLogin {
    accessToken: string;
    type: 'facebook';
}

export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    captchaText?: string;
    captchaCode?: string;
}

export const AuthAPI = {
    register: (data: IRegister) => axios.post(`${AUTH_URL}/register`, data),

    socialRegister: (data: IRegister) => axios.post(`${AUTH_URL}/social-register`, data),
};
