import { FC, ReactNode, useEffect, useState } from 'react';
import { IoLogoAndroid, IoLogoApple, IoLogoWindows } from 'react-icons/io5';

import styles from './StoreButton.module.scss';

type TStore = 'microsoftStore' | 'googlePlay' | 'appStore';

interface IProps {
    type: TStore;
    data?: { appId: string; app: string; web: string };
}

const STORES: { [key in TStore]: { text: string; icon: ReactNode; app: string; web: string } } = {
    microsoftStore: {
        text: 'Microsoft Store',
        icon: <IoLogoWindows />,
        app: 'ms-windows-store://pdp/?productid=',
        web: 'https://apps.microsoft.com/store/detail/stdio/',
    },
    googlePlay: {
        text: 'Google Play',
        icon: <IoLogoAndroid />,
        app: '',
        web: '',
    },
    appStore: {
        text: 'App Store',
        icon: <IoLogoApple />,
        app: '',
        web: '',
    },
};

const StoreButton: FC<IProps> = ({ type, data }) => {
    const [link, setLink] = useState('');

   

    if (!!!data) return null;

    return (
        <a href={link} className={styles.storeButton}>
            <span className={styles.icon}>{STORES[type].icon}</span>
            <span className={styles.content}>
                <span>Get it on</span>
                <span>{STORES[type].text}</span>
            </span>
        </a>
    );
};

export default StoreButton;
