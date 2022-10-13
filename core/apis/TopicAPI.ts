import { API_URL } from '@stdio/configs/config';
import { IQuery, IUpdateTopic } from '@stdio/configs/custom-types';
import { axios } from '@stdio/core/libs/custom-axios';

const TOPIC_URL = `${API_URL}/topics`;

export interface ICreateTopic {
    name: string;
    parent?: string;
    order: number;
}

export const TopicAPI = {
    getTopics: (params: IQuery = {}) => axios.get(`${TOPIC_URL}`, { params }),

    createTopic: (topicData: ICreateTopic) => axios.post(`${TOPIC_URL}`, topicData),

    getTopicById: (id: string) => axios.get(`${TOPIC_URL}/${id}`),

    getTopicBySlug: (slug: string) => axios.get(`${TOPIC_URL}/slug/${slug}`),

    updateTopic: (id: string, data: IUpdateTopic) => axios.patch(`${TOPIC_URL}/${id}`, data),

    deleteTopic: (id: string) => axios.delete(`${TOPIC_URL}/${id}`),
};
