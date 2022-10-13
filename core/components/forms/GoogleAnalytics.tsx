import { FC } from 'react';

import { IS_DEV } from '@stdio/configs/config';

interface IProps {
    ua4: string;
}

const GoogleAnalytics: FC<IProps> = ({ ua4 }) =>
    IS_DEV ? null : (
        <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ua4}`}></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ua4}');`,
                }}
            ></script>
        </>
    );

export default GoogleAnalytics;
