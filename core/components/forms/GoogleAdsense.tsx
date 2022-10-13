import { FC, useEffect } from 'react';

import { IS_DEV } from '@stdio/configs/config';

export enum AdsType {
    ArticlePCRight1,
    ArticlePCRight2,
    ArticlePhoneTop,
    ArticlePhoneCenter,
    ArticlePhoneBottom,
    ArticlesBottom,
    SearchBottom,
}

interface IProps {
    type: AdsType;
}

const CLIENT = 'ca-pub-6817535307616905';

const GoogleAdsense: FC<IProps> = ({ type }) => {
    useEffect(() => {
        try {
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    if (IS_DEV) return null;

    switch (type) {
        case AdsType.ArticlePCRight1:
            return (
                <ins
                    className="adsbygoogle"
                    style={{
                        display: 'inline-block',
                        width: '300px',
                        height: '250px',
                    }}
                    data-ad-client={CLIENT}
                    data-ad-slot="5969895529"
                ></ins>
            );
        case AdsType.ArticlePCRight2:
            return (
                <ins
                    className="adsbygoogle"
                    style={{
                        display: 'inline-block',
                        width: '300px',
                        height: '250px',
                    }}
                    data-ad-client={CLIENT}
                    data-ad-slot="2281903040"
                ></ins>
            );
        case AdsType.ArticlePhoneTop:
            return (
                <ins
                    className="adsbygoogle"
                    style={{
                        display: 'inline-block',
                        width: '300px',
                        height: '250px',
                    }}
                    data-ad-client={CLIENT}
                    data-ad-slot="8579114479"
                ></ins>
            );
        case AdsType.ArticlePhoneCenter:
            return (
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client={CLIENT}
                    data-ad-slot="6522092427"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            );
        case AdsType.ArticlePhoneBottom:
            return (
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client={CLIENT}
                    data-ad-slot="5839829166"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            );
        case AdsType.ArticlesBottom:
            return (
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-format="fluid"
                    data-ad-layout-key="-hq-8+25-35+8"
                    data-ad-client={CLIENT}
                    data-ad-slot="6542168529"
                ></ins>
            );
        case AdsType.SearchBottom:
            return (
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-format="fluid"
                    data-ad-layout-key="-i0-8+25-35+8"
                    data-ad-client={CLIENT}
                    data-ad-slot="4410829209"
                ></ins>
            );
        default:
            return null;
    }
};

export default GoogleAdsense;
