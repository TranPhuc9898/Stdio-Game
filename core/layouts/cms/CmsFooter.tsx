import React, { ReactNode, FC } from 'react';

import { SITE_NAME } from '@stdio/configs/config';

import styles from './CmsFooter.module.scss';

interface IProps {
    children: ReactNode;
}

const CmsFooter: FC<IProps> = ({ children }) => {
    return (
        <div className={styles.cmsFooter}>
            {SITE_NAME} ©2018-{new Date().getFullYear()}
            Thiết kế bởi <a href="https://solutions.stdio.vn">STDIO</a>
        </div>
    );
};

export default CmsFooter;
