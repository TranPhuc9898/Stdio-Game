import { API_URL, POSTS_PAGE_SIZE } from '@stdio/configs/config';
import { INewPost, IPostQuery, IUpdatePost } from '@stdio/configs/custom-types';
import { axios } from '@stdio/core/libs/custom-axios';

const POST_URL = `${API_URL}/posts`;

export const PostAPI = {
    getPosts: (params?: IPostQuery) =>
        axios.get(`${POST_URL}`, {
            params: {
                sortField: 'createdAt',
                sortOrder: 'desc',
                limit: POSTS_PAGE_SIZE,
                ...params,
            },
        }),

    searchPosts: (keyword: string, pageNumber?: number, nPerPage?: number) =>
        axios.get(`${POST_URL}/search`, {
            params: { keyword, pageNumber, nPerPage: nPerPage ? nPerPage : 10 },
        }),
    createPost: (articleData: INewPost) => axios.post(`${POST_URL}`, articleData),
    getPostById: (id: string) => axios.get(`${POST_URL}/${id}`),
    getPostBySlug: (slug: string) => {
        let match = slug.trim().match(/-(\w*)$/);
        if (!!match) return axios.get(`${POST_URL}/@${match[1].trim()}`);
    },

    queryPostsByParentTopic: (params?: IPostQuery) =>
        axios.get(`${POST_URL}/parent-topic`, {
            params: {
                sortField: 'createdAt',
                sortOrder: 'desc',
                limit: POSTS_PAGE_SIZE,
                ...params,
            },
        }),
    updatePost: (id: string, data: IUpdatePost) => axios.patch(`${POST_URL}/${id}`, data),
    likePost: (articleId: string) => axios.post(`${POST_URL}/like/${articleId}`),
    deletePost: (id: string) => axios.delete(`${POST_URL}/${id}`),
    updateThumbnailSquare: (id: string, data: any) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${POST_URL}/${id}/thumbnail-square`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    updateThumbnailHD: (id: string, data: any) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${POST_URL}/${id}/thumbnail-hd`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    uploadContentImage: (id: string, blob: any) => {
        const formData = new FormData();
        const data = blob.blob();
        formData.append('image', data);

        return axios.post(`${POST_URL}/${id}/content-images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    uploadContentFile: (id: string, data: any) => {
        const formData = new FormData();

        formData.append('file', data);

        return axios.post(`${POST_URL}/${id}/content-files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getContentImages: (id: string) => axios.get(`${POST_URL}/${id}/content-images`),

    deleteContentImage: (id: string, imageId: string) =>
        axios.delete(`${POST_URL}/${id}/content-images/${imageId}`),

    getAffProducts: (keyword: string) =>
        axios.get(`${POST_URL}/affiliate-products/search?keyword=${keyword}`),
};
