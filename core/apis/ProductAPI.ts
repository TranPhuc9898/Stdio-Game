import { axios } from '@stdio/core/libs/custom-axios';

import { API_URL } from '@stdio/configs/config';
import { IAffiliateProduct } from '@stdio/configs/custom-types';

const AFFILIATE_PRODUCTS_API = `${API_URL}/affiliate-products`;

export interface IRandomAffiliateProducts {
    quantity?: number;
    excludingIds?: string[];
}

export const ProductAPI = {
    createAffiliateProduct: (productData: IAffiliateProduct) =>
        axios.post(`${AFFILIATE_PRODUCTS_API}`, productData),

    getAffiliateProducts: () => axios.get(AFFILIATE_PRODUCTS_API),

    getRandomAffProducts: (randomData: IRandomAffiliateProducts) =>
        axios.post(`${AFFILIATE_PRODUCTS_API}/utils/random`, randomData),

    getAffiliateProduct: (productId: string) => axios.get(`${AFFILIATE_PRODUCTS_API}/${productId}`),

    updateAffiliateProduct: (productId: string, productData: IAffiliateProduct) =>
        axios.patch(`${AFFILIATE_PRODUCTS_API}/${productId}`, productData),

    updateThumbnailSquare: (id: string, data: any) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${AFFILIATE_PRODUCTS_API}/${id}/thumbnail-square`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    updateThumbnailHD: (id: string, data: any) => {
        const formData = new FormData();
        formData.append('file', data);

        return axios.post(`${AFFILIATE_PRODUCTS_API}/${id}/thumbnail-hd`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteAffiliateProduct: (productId: string) =>
        axios.delete(`${AFFILIATE_PRODUCTS_API}/${productId}`),
};
