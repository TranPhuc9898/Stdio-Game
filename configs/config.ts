import env from '../env.json';

export const { API_URL, MEDIA_URL, SITE_URL, ACTIVE_ENV } = env;
export const SITE_NAME = 'STDIO';

export const IS_DEV = ACTIVE_ENV !== 'production';

export const LINKS = {
    MESSENGER: 'https://m.me/stdio.vn',
};

export const TIME_OUT_TOKEN = 30 * 60 * 1000;
export const LOGIN_URL = `${API_URL}auth/login`;

export const DEFAULT_PROFILE = {
    PICTURE: '/static/logo-grey.svg',
    COVER: '/static/logo-grey.svg',
};

export const FB_CFG = {
    appId: '694952747229279',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v8.0',
};

export const GG_CFG = {
    verification: '7MJCLhD6RquVhLDLP96cN0fcmfhpHYs0NVm48RjVKSo',
    pinterest: '7930469b9d143adc59e48c192c48aea6',
    ga4: 'G-YZ87XBYD0P',
};

export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCBTlsjc0ZsmI9Bue7ekS-qzKLXAsfnB2M',
    authDomain: 'stdio-bd3a5.firebaseapp.com',
    projectId: 'stdio-bd3a5',
    storageBucket: 'stdio-bd3a5.appspot.com',
    messagingSenderId: '245727641993',
    appId: '1:245727641993:web:7b3c94c290000881dca158',
    measurementId: 'G-0PYFS3892J',
};

export const TINYMCE_API_KEY = 'xelbesd9izoo98jrw5ek5hvwpa9uduefc6kzn19knixlbj92';

export const ARTICLES_PAGE_SIZE = 9;
export const POSTS_PAGE_SIZE = 10;
export const COMMENTS_PAGE_SIZE = 5;

export const TEST_ID = '5d47eae7e95693001bb87397';
export const BUNDLE_ID = '5d4ac413c89214001b880c9e';

export const TYPES = {
    INDEX: {
        INDEX: '',
        DISCOVER: 'discover',
        ME: 'me',
    },
    PROFILE: {
        INDEX: '',
        SAVED: 'saved',
        FOLLOWING: 'following',
        FOLLOWERS: 'followers',
        BOARDS: 'boards',
        ABOUT: 'about',
    },
    SETTINGS: {
        EXPERIENCE: 'experience',
        SECURITY: 'security',
    },
};
