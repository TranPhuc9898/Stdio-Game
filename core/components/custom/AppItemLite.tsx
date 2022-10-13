import { FC, useEffect, useState } from 'react';
import { isWindows } from 'react-device-detect';
import { IoLogoWindows } from 'react-icons/io5';

import { IApp } from '@stdio/configs/custom-types';
import { getMediaURL } from '@stdio/core/libs/custom-utils';

import styles from './AppItemLite.module.scss';

interface IProps {
    app: IApp;
}

const LINK = {
    app: 'ms-windows-store://pdp/?productid=',
    web: 'https://apps.microsoft.com/store/detail/stdio/',
};

const AppItemLite: FC<IProps> = ({ app }) => {
    const [link, setLink] = useState('');

    useEffect(() => {
        setLink(LINK[isWindows ? 'app' : 'web'] + app?.microsoftStore?.appId ?? '');
    }, [isWindows]);

    return (
        <a href={link} className={styles.appItemLite}>
            <span className={styles.icon}>
                <img
                    alt={`${app?.name ?? ''} - ${app?.headline ?? ''}`}
                    src={getMediaURL(app?.icon ?? '')}
                />
            </span>
            <span className={styles.meta}>
                <span className={styles.name}>{app?.name ?? ''}</span>
                <span className={styles.headline}>{app?.headline ?? ''}</span>
                <span className={styles.button}>
                    <span>
                        <IoLogoWindows size={24} />
                    </span>
                    <span>
                        GET IT ON
                        <br />
                        Microsoft Store
                    </span>
                </span>
            </span>
        </a>
    );
};

export default AppItemLite;
