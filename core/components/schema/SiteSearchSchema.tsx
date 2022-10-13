import { FC } from 'react';

export interface ISiteSearchSchema {
    url: string;
    target: string; // https://www.stdio.vn/articles/search?q={search_term_string}
}

interface IProps {
    siteSearchSchema: ISiteSearchSchema;
}

const ArticleSchema: FC<IProps> = ({ siteSearchSchema }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    url: '${siteSearchSchema.url}',
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: '${siteSearchSchema.target}',
                        'query-input': 'required name=search_term_string',
                    },
                }),
            }}
        ></script>
    );
};

export default ArticleSchema;
