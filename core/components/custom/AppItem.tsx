import { IconButton } from '@mui/material';
import Link from 'next/link';
import { FC, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import { IApp } from '@stdio/configs/custom-types';
import { getMediaURL } from '@stdio/core/libs/custom-utils';
import StoreButton from '../forms/StoreButton';
import EditorPopover from './EditorPopover';

import styles from './AppItem.module.scss';

interface IProps {
    app: IApp;
}

const AppItem: FC<IProps> = ({ app }) => {
    const editorPopoverRef = useRef<any>(null);

    return (
        <div className={styles.appItem}>
            <div className={styles.meta}>
                <Link href={`/${app.slug}`}>
                    <a className={styles.picture}>
                        <img src={getMediaURL(app.icon)} alt={`${app.name} - ${app.headline}`} />
                    </a>
                </Link>

                <div className={styles.content}>
                    <h2>
                        <Link href={`/${app.slug}`}>
                            <a>{app.name}</a>
                        </Link>
                    </h2>
                    <p>{app.description}</p>
                </div>
            </div>
            <div className={styles.actions}>
                <StoreButton type="microsoftStore" data={app?.microsoftStore} />
            </div>
       
        </div>
    );
};

export default AppItem;
