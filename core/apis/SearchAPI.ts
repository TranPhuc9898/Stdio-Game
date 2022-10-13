import { API_URL, ARTICLES_PAGE_SIZE } from '@stdio/configs/config';
import { TSearch } from '@stdio/configs/custom-types';
import { axios } from '@stdio/core/libs/custom-axios';

export const SearchAPI = {
    search: (type: TSearch, keyword: string, page: number | null, pageSize?: number) => {
        return axios.get(`${API_URL}/${type}/search${type === 'boards' ? '/keyword' : ''}`, {
            params: {
                keyword,
                page,
                pageSize: !!pageSize ? pageSize : ARTICLES_PAGE_SIZE,
            },
        });
    },
};
