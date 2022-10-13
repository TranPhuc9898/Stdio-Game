import { axios } from '@stdio/core/libs/custom-axios';

import { API_URL, ARTICLES_PAGE_SIZE } from '@stdio/configs/config';
import {
    IArticleQuery,
    IMeActionForm,
    IShortContact,
    IShortProfile,
} from '@stdio/configs/custom-types';

const ME_URL = `${API_URL}/me`;

export interface IUpdatePassword {
    currentPassword: string;
    newPassword: string;
}

export const MeAPI = {
    checkProfile: (token: string) =>
        axios.get(`${ME_URL}/profile/check`, {
            headers: {
                authorization: token,
            },
        }),

    getUser: () => axios.get(`${ME_URL}/user`),

    getProfile: () => axios.get(`${ME_URL}/profile`),

    getContact: () => axios.get(`${ME_URL}/contact`),

    getArticles: (params?: IArticleQuery) =>
        axios.get(`${ME_URL}/articles`, {
            params: {
                sortField: 'createdAt',
                sortOrder: 'desc',
                limit: ARTICLES_PAGE_SIZE,
                ...params,
            },
        }),

    getBoards: () => axios.get(`${ME_URL}/boards`),

    updatePicture: (data: any) => {
        const formData = new FormData();
        formData.append('file', data);
        return axios.post(`${ME_URL}/picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    updateCover: (data: any) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${ME_URL}/cover`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    followUser: (data: IMeActionForm) => axios.put(`${ME_URL}/action`, null, { params: data }),

    subscribeBoard: (data: IMeActionForm) => axios.put(`${ME_URL}/action`, null, { params: data }),

    getSubscribedBoards: () => axios.get(`${ME_URL}/subscribing`),

    getFollowing: () => axios.get(`${ME_URL}/following`),

    getFollowers: () => axios.get(`${ME_URL}/followers`),

    updateProfile: (data: IShortProfile) => axios.patch(`${ME_URL}/profile`, data),

    updateContact: (data: IShortContact) => axios.patch(`${ME_URL}/contact`, data),
};
