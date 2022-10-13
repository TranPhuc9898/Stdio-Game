import { API_URL } from '@stdio/configs/config';
import { ITag, IUpdateTag } from '@stdio/configs/custom-types';
import { axios } from '@stdio/core/libs/custom-axios';

const TOPIC_URL = `${API_URL}/tags`;

export const TagAPI = {
    getTags: () => axios.get(`${TOPIC_URL}`),
    createTag: (tagData: ITag) => axios.post(`${TOPIC_URL}`, tagData),
    getTagById: (id: string) => axios.get(`${TOPIC_URL}/${id}`),
    updateTag: (id: string, data: IUpdateTag) => axios.patch(`${TOPIC_URL}/${id}`, data),
    deleteTag: (id: string) => axios.delete(`${TOPIC_URL}/${id}`),
};
