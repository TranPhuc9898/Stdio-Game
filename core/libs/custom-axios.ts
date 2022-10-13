import axios from 'axios';
import { isEmpty, isNull } from 'lodash';

import { Storage } from './storage';

let callback401 = () => {};

export const set401Callback = (cb: any) => {
    callback401 = cb;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (!isEmpty(response) && response.status === 401 && !isNull(callback401)) {
            set401Callback(response.data.error);
        }

        if (response.status == 401) {
            callback401();
        }

        return Promise.reject(error);
    },
);

axiosInstance.interceptors.request.use(
    (config: any) => {
        if (!config.headers.authorization) {
            try {
                let token = Storage.Cookie.get('token');


                if (!isEmpty(token)) {
                    config.headers.authorization = token;
                }
            } catch (err) {
                console.log(err);
            }
        }

        return config;
    },
    (error: any) => Promise.reject(error),
);

export { axiosInstance as axios };
