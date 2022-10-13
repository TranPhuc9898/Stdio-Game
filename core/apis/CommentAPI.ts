import { API_URL, COMMENTS_PAGE_SIZE } from '@stdio/configs/config';
import { axios } from '@stdio/core/libs/custom-axios';

const COMMENT_URL = `${API_URL}/comments`;

export interface IUpdateComment {
    content?: string;
    isReviewed?: boolean;
    isPublished?: boolean;
}

export const CommentAPI = {
    count: (articleId: string) => axios.get(`${COMMENT_URL}/count/${articleId}`),
    getIsNotReviewedComment: () => axios.get(`${COMMENT_URL}/isNotReviewed`),
    getComments: () => axios.get(`${COMMENT_URL}/isReviewed`),
    getUserComments: (articleId: string, user: string) =>
        axios.get(`${COMMENT_URL}`, {
            params: {
                limit: -1,
                filter: { parent: null, articleId, user },
            },
        }),
    getParentComments: (articleId: string, lastId: string | null = null, user: string) =>
        axios.get(`${COMMENT_URL}`, {
            params: {
                limit: COMMENTS_PAGE_SIZE,
                filter: { parent: null, articleId },
                lastId,
                exclude: user,
            },
        }),

    getChildComments: (parentId: string, articleId: string, lastId: string | null = null) =>
        axios.get(`${COMMENT_URL}`, {
            params: {
                limit: COMMENTS_PAGE_SIZE,
                filter: { parent: parentId, articleId },
                lastId,
            },
        }),
    createComment: (articleId: string, content: string, parent: string | null = null) =>
        axios.post(`${COMMENT_URL}`, { articleId, content, parent }),
    updateComment: (commentId: string, commentData: IUpdateComment) =>
        axios.patch(`${COMMENT_URL}/${commentId}`, commentData),
    likeComment: (id: string) => axios.post(`${COMMENT_URL}/like/${id}`),
    deleteComment: (id: string) => axios.delete(`${COMMENT_URL}/${id}`),
};
