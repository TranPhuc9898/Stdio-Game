import { API_URL, ARTICLES_PAGE_SIZE } from '@stdio/configs/config';
import { IArticleQuery } from '@stdio/configs/custom-types';
import { axios } from '@stdio/core/libs/custom-axios';

const USER_URL = `${API_URL}/users`;

export const ProfileAPI = {
    getWriters: () => axios.get(`${USER_URL}/writers`),

    getUser: (username: string) => {
        let _username = username[0] !== '@' ? `@${username}` : username;
        return axios.get(`${USER_URL}/user/${_username}`);
    },

    getProfile: (username: string) => {
        let _username = username[0] !== '@' ? `@${username}` : username;
        return axios.get(`${USER_URL}/profile/${_username}`);
    },

    getArticles: (profileId: string, params?: IArticleQuery) =>
        axios.get(`${USER_URL}/profile/${profileId}/articles`, {
            params: {
                sortField: 'createdAt',
                sortOrder: 'desc',
                limit: ARTICLES_PAGE_SIZE,
                ...params,
            },
        }),

    getBoards: (profileId: string) => axios.get(`${USER_URL}/profile/${profileId}/boards`),

    getSubscribedBoards: (profileId: string) =>
        axios.get(`${USER_URL}/profile/${profileId}/subscribing`),

    getFollowing: (profileId: string) => axios.get(`${USER_URL}/profile/${profileId}/following`),

    getFollowers: (profileId: string) => axios.get(`${USER_URL}/profile/${profileId}/followers`),

    bookmarkArticle: (articleId: string) => axios.post(`${USER_URL}/bookmarks/${articleId}`),
};
