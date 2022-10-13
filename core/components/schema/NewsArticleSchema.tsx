import { FC } from 'react';
import striptags from 'striptags';

import { formatISO_8601 } from '@stdio/core/libs/utils';

export interface INewsArticleSchema {
    headline: string;
    datePublished: number;
    dateModified: number;
    description: string;
    image: {
        height: number;
        width: number;
        url: string;
    };
    author: string;
    publisher: {
        logo: {
            url: string;
        };
        name: string;
    };
    articleBody: string;
    mainEntityOfPage: {
        url: string;
    };
}

interface IProps {
    newsArticleSchema: INewsArticleSchema;
}

const NewsArticleSchema: FC<IProps> = ({ newsArticleSchema }) => {
    const makeNewsArticleSchema = () => {
        return {
            '@context': 'http://schema.org/',
            '@type': 'NewsArticle',
            headline: newsArticleSchema?.headline ?? '',
            datePublished: formatISO_8601(newsArticleSchema?.datePublished ?? 0),
            dateModified: formatISO_8601(newsArticleSchema?.dateModified ?? 0),
            description: striptags(newsArticleSchema?.description ?? ''),
            image: {
                '@type': 'ImageObject',
                height: newsArticleSchema?.image.height ?? 720,
                width: newsArticleSchema?.image.width ?? 1280,
                url: newsArticleSchema?.image.url ?? '',
            },
            author: {
                '@type': 'Person',
                name: `${newsArticleSchema?.author ?? ''}`,
            },
            publisher: {
                '@type': 'Organization',
                logo: {
                    '@type': 'ImageObject',
                    url: newsArticleSchema?.publisher.logo.url ?? '',
                },
                name: newsArticleSchema?.publisher.name ?? '',
            },
            articleBody: striptags(newsArticleSchema?.articleBody ?? ''),
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': newsArticleSchema?.mainEntityOfPage.url ?? '',
                url: newsArticleSchema?.mainEntityOfPage.url ?? '',
            },
        };
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(makeNewsArticleSchema()),
            }}
        ></script>
    );
};

export default NewsArticleSchema;
