import { API_URL } from '@stdio/configs/config';
import { axios } from '@stdio/core/libs/custom-axios';

const GENRE_URL = `${API_URL}/genres`;

// interface ICreateApp {
//     name: string;
//     genreId: '6274970286f6e598d2fe103e';
// }

// interface IUpdateContent {
//     name?: string;
//     slug?: string;
//     headline?: string;
//     description?: string;
//     how2use?: string;
//     microsoftStore?: {
//         appId?: string;
//         app?: string;
//         web?: string;
//     };
//     price?: number;
//     salePrice?: number;
//     order?: number;
//     isBestSelling?: boolean;
//     isPublished?: boolean;
//     isFeatured?: boolean;
// }

// interface IUpdateFeature {
//     title?: string;
//     description?: string;
// }

export const GenreAPI = {
    getGenres: () => axios.get(`${GENRE_URL}`),
    // createApp: (data: { appData: ICreateApp }) => axios.post(`${APP_URL}`, data),
    // getApps: () => axios.get(`${APP_URL}`),
    // getAppById: (id: string) => axios.get(`${APP_URL}/${id}`),
    // getAppBySlug: (slug: string) => axios.get(`${APP_URL}/@${slug}`),
    // updateContent: (id: string, data: IUpdateContent) => axios.patch(`${APP_URL}/${id}`, data),
    // uploadIcon: (id: string, file: Blob) => {
    //     const form = new FormData();
    //     form.append('file', file);
    //     return axios.post(`${APP_URL}/${id}/icon`, form, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    // },
    // uploadBanner: (id: string, file: Blob) => {
    //     const form = new FormData();
    //     form.append('file', file);
    //     return axios.post(`${APP_URL}/${id}/banner`, form, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    // },
    // uploadShare: (id: string, file: Blob) => {
    //     const form = new FormData();
    //     form.append('file', file);
    //     return axios.post(`${APP_URL}/${id}/share`, form, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    // },
    // deleteIcon: (id: string) => {
    //     return axios.delete(`${APP_URL}/${id}/icon`);
    // },
    // deleteBanner: (id: string) => {
    //     return axios.delete(`${APP_URL}/${id}/banner`);
    // },
    // deleteShare: (id: string) => {
    //     return axios.delete(`${APP_URL}/${id}/share`);
    // },
    // createFeature: (appId: string, data: { title: string; description: string }) =>
    //     axios.post(`${APP_URL}/${appId}/features`, data),
    // updateFeature: (appId: string, featureId: string, data: IUpdateFeature) => {
    //     return axios.patch(`${APP_URL}/${appId}/features/${featureId}`, data);
    // },
    // moveFeature: (appId: string, featureId: string, factor: -1 | 1) => {
    //     return axios.patch(`${APP_URL}/${appId}/features/${featureId}/index`, { factor });
    // },
    // deleteFeature: (appId: string, featureId: string) => {
    //     return axios.delete(`${APP_URL}/${appId}/features/${featureId}`);
    // },
    // uploadFeatureScreenshot: (appId: string, featureId: string, file: Blob) => {
    //     const form = new FormData();
    //     form.append('file', file);
    //     return axios.patch(`${APP_URL}/${appId}/features/${featureId}/screenshot`, form, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    // },
    // deleteFeatureScreenshot: (appId: string, featureId: string) => {
    //     return axios.delete(`${APP_URL}/${appId}/features/${featureId}/screenshot`);
    // },
};
