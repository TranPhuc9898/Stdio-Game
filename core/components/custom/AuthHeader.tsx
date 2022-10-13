import Link from 'next/link';
import { FC } from 'react';

import { SITE_NAME } from '@stdio/configs/config';
import styles from './AuthHeader.module.scss';

interface IProps {}

const AuthHeader: FC<IProps> = () => {
    return (
        <div className={styles.authHeader}>
            <div className={styles.authHeaderCenter}>
                <div className={styles.logo}>
                    <Link href="/">
                        <a>
                            <img
                                src="/static/logo-stdio.svg"
                                alt={SITE_NAME}
                                style={{ width: 50, height: 50 }}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthHeader;
