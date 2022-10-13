import axios from 'axios';

import { API_URL } from '@stdio/configs/config';

const CAPTCHA_URL = `${API_URL}/captcha`;

export const CaptchaAPI = {
    getCaptcha: () => axios.get(`${CAPTCHA_URL}`),
};
