import { API_URL } from '@stdio/configs/config';
import { axios } from '@stdio/core/libs/custom-axios';

import { IBoard, IQueryBoard, IUpdateBoard } from '@stdio/configs/custom-types';

const BOARD_URL = `${API_URL}/boards`;

export const BoardAPI = {
    getBoards: (options?: IQueryBoard) => axios.get(`${BOARD_URL}`, { params: {} }),

    createBoard: (boardData: IBoard) => axios.post(`${BOARD_URL}`, boardData),

    getBoardById: (id: string) => axios.get(`${BOARD_URL}/${id}`),

    getBoardBySlug: (slug: string) => axios.get(`${BOARD_URL}/slug/${slug}`),

    getFeaturedBySlug: (slug: string) => axios.get(`${BOARD_URL}/slug/${slug}/featured`),

    updateBoard: (id: string, data: IUpdateBoard) => axios.patch(`${BOARD_URL}/${id}`, data),

    deleteBoard: (id: string) => axios.delete(`${BOARD_URL}/${id}`),

    updateBoardLogo: (id: string, data: any) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${BOARD_URL}/${id}/logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    updateBoardCover: (id: string, data: any) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${BOARD_URL}/${id}/cover`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getSubscribers: (id: string) => axios.get(`${BOARD_URL}/${id}/subscribers`),
};
