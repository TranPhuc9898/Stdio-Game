import { API_URL, ARTICLES_PAGE_SIZE } from '@stdio/configs/config';
import { BlobInfo, IArticleQuery, INewArticle, IUpdateArticle } from '@stdio/configs/custom-types';
import { axios } from '@stdio/core/libs/custom-axios';

const ARTICLE_URL = `${API_URL}/articles`;

export const ArticleAPI = {
    getArticles: (params?: IArticleQuery) =>
        axios.get(`${ARTICLE_URL}`, {
            params: {
                sortField: 'createdAt',
                sortOrder: 'desc',
                limit: ARTICLES_PAGE_SIZE,
                ...params,
            },
        }),

    searchArticles: (keyword: string, pageNumber?: number, pageSize?: number) =>
        axios.get(`${ARTICLE_URL}/search`, {
            params: { keyword, pageNumber, pageSize: pageSize ? pageSize : ARTICLES_PAGE_SIZE },
        }),

    createArticle: (articleData: INewArticle) => axios.post(`${ARTICLE_URL}`, articleData),

    getArticleById: (id: string) => axios.get(`${ARTICLE_URL}/${id}`),

    getArticleByInternalId: (internalId: string) => {
        return axios.get(`${ARTICLE_URL}/@${internalId}`);
    },

    getArticleBySlug: (slug: string) => {
        let match = slug.trim().match(/-(\w*)$/);
        if (!!match) return axios.get(`${ARTICLE_URL}/@${match[1].trim()}`);
    },

    queryArticlesByParentTopic: (params?: IArticleQuery) =>
        axios.get(`${ARTICLE_URL}/parent-topic`, {
            params: {
                sortField: 'createdAt',
                sortOrder: 'desc',
                limit: ARTICLES_PAGE_SIZE,
                ...params,
            },
        }),

    updateArticle: (id: string, data: IUpdateArticle) => axios.patch(`${ARTICLE_URL}/${id}`, data),

    likeArticle: (articleId: string) => axios.post(`${ARTICLE_URL}/like/${articleId}`),

    deleteArticle: (id: string) => axios.delete(`${ARTICLE_URL}/${id}`),

    updateThumbnailSquare: (id: string, data: Blob) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${ARTICLE_URL}/${id}/thumbnail-square`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    updateThumbnailHD: (id: string, data: Blob) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${ARTICLE_URL}/${id}/thumbnail-hd`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    uploadContentImage: (id: string, blob: BlobInfo) => {
        const formData = new FormData();
        const data = blob.blob();
        formData.append('image', data);

        return axios.post(`${ARTICLE_URL}/${id}/content-images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    uploadContentFile: (id: string, data: Blob) => {
        const formData = new FormData();

        formData.append('file', data);

        return axios.post(`${ARTICLE_URL}/${id}/content-files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getContentImages: (id: string) => axios.get(`${ARTICLE_URL}/${id}/content-images`),

    deleteContentImage: (id: string, imageId: string) =>
        axios.delete(`${ARTICLE_URL}/${id}/content-images/${imageId}`),

    getAffProducts: (keyword: string) =>
        axios.get(`${ARTICLE_URL}/affiliate-products/search?keyword=${keyword}`),
};
