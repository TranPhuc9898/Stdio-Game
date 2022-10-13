import { axios } from '@stdio/core/libs/custom-axios';

import { API_URL } from '@stdio/configs/config';
import { INewCategory, IQuery, IUpdateCategory } from '@stdio/configs/custom-types';

const BOARD_URL = `${API_URL}/boards`;

export const CategoryAPI = {
    getCategoriesByBoardId: (boardId: string, params: IQuery) => {
        return axios.get(`${BOARD_URL}/${boardId}/categories`, { params });
    },

    getCategories: (params: IQuery) => {
        return axios.get(`${BOARD_URL}/categories`, { params });
    },

    createCategory: (boardId: string, data: INewCategory) =>
        axios.post(`${BOARD_URL}/${boardId}/categories`, data),

    getCategoryById: (boardId: string, categoryId: string) =>
        axios.get(`${BOARD_URL}/${boardId}/categories/${categoryId}`),

    updateCategory: (boardId: string, categoryId: string, data: IUpdateCategory) =>
        axios.patch(`${BOARD_URL}/${boardId}/categories/${categoryId}`, data),

    deleteCategory: (categoryId: string) => axios.delete(`${BOARD_URL}/categories/${categoryId}`),
};
