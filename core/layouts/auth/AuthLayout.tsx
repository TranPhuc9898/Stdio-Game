import React, { FC, ReactNode } from 'react';

import AuthHeader from '@stdio/core/components/custom/AuthHeader';
import AuthFooter from '@stdio/core/components/custom/AuthFooter';

import styles from './AuthLayout.module.scss';

interface IProps {
    children?: ReactNode;
}

const AuthLayout: FC<IProps> = ({ children }) => {
    return (
        <div className={styles.authLayout}>
            <AuthHeader />
            <div className={styles.content}>{children}</div>
            <AuthFooter />
        </div>
    );
};

export default AuthLayout;
