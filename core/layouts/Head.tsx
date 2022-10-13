import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { FB_CFG, GG_CFG, SITE_NAME, SITE_URL, IS_DEV } from '@stdio/configs/config';
import { TRole } from '@stdio/configs/custom-types';
import GoogleAnalytics from '../components/forms/GoogleAnalytics';

const getCmsTitle = (role: TRole) => {
    if (role === 'reader') {
        return 'Reader';
    } else if (role === 'writer') {
        return 'Writer';
    } else if (role === 'editor') {
        return 'Editor';
    }

    return '';
};

interface IMeta {
    title?: string;
    description: string;
    image?: string;
    url?: string;
    brand?: string;
    type?: 'website' | 'article';
}

interface IProps {
    info:
        | {
              page: 'main';
              meta: IMeta;
          }
        | {
              page: 'auth';
              title?: string;
              description?: string;
          }
        | {
              page: 'cms';
              role: TRole;
          };
}

const Head: FC<IProps> = ({ info }) => {
    const router = useRouter();

    let updatedBrand = SITE_NAME;

    let updatedTitle = SITE_NAME;
    let updatedDescription = '';
    let updatedImage = SITE_URL + '/static/fb-img.png';
    let updatedType = 'website';
    let updatedUrl = SITE_URL + router.asPath;

    if (info.page === 'main') {
        const { title, description, image, brand, url, type } = info.meta;

        if (!!brand) updatedBrand = brand;

        if (!!title) updatedTitle = title + ' — ' + updatedBrand;
        updatedDescription = description;

        if (!!image) updatedImage = image;
        if (!!type) updatedType = type;
        if (!!url) updatedUrl = url;
    } else if (info.page === 'auth') {
        const { title, description } = info;
        if (!!title) updatedTitle = title + ' — ' + updatedBrand;
        if (!!description) updatedDescription = description;
    } else if (info.page === 'cms') {
        updatedTitle = getCmsTitle(info.role) + ' — ' + updatedBrand;
    }

    return (
        <NextHead>
            <meta charSet="utf-8" />
            <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
            <meta name="theme-color" content="#ff9900" />
            {/* HTML Meta Tags */}
            <title>{updatedTitle}</title>
            <meta name="robots" content="index,follow" />
            {/* Google / Search Engine Tags */}
            <meta name="name" content={updatedTitle} />
            <meta name="description" content={updatedDescription} />
            <meta name="image" content={updatedImage} />
            <meta name="google-site-verification" content={GG_CFG.verification} />
            {/* Facebook Meta Tags */}
            <meta property="og:title" content={updatedTitle} />
            <meta property="og:description" content={updatedDescription} />
            <meta property="og:image" content={updatedImage} />
            <meta property="og:type" content={updatedType} />
            <meta property="og:url" content={updatedUrl} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="fb:app_id" content={FB_CFG.appId} />
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={updatedTitle} />
            <meta name="twitter:description" content={updatedDescription} />
            <meta name="twitter:image" content={updatedImage} />
            <GoogleAnalytics ua4={GG_CFG.ga4} />

            {!IS_DEV && (
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6817535307616905"
                    data-crossorigin="anonymous"
                ></script>
            )}
        </NextHead>
    );
};

export default Head;
