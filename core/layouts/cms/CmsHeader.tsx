import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { BiHome, BiLogOut } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { SITE_NAME } from '@stdio/configs/config';
import { AppState } from '@stdio/core/redux';
import { authActions } from '@stdio/core/redux/authSlice';

import styles from './CmsHeader.module.scss';

interface IProps {
    children?: ReactNode;
}

const CmsHeader: FC<IProps> = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector((state: AppState) => state.auth);

    const role = 'editor';

    return (
        <>
            <div className={styles.cmsHeader}>
                <div className={styles.cmsHeaderCenter}>
                    <Link href="/">
                        <a className={styles.logo}>
                            <img
                                src="/static/logo-stdio.svg"
                                alt={SITE_NAME}
                                width={50}
                                height={50}
                            />
                        </a>
                    </Link>
                    <div className={styles.role}>
                        <span>CMS</span>
                        <span>{role}</span>
                    </div>
                </div>
            </div>
            <div className={styles.edgeActions}>
                <Link href="/">
                    <a className={styles.button}>
                        <BiHome />
                    </a>
                </Link>
                {isLoggedIn && (
                    <a
                        className={styles.button}
                        role="button"
                        onClick={async () => {
                            await dispatch(authActions.logout());
                            router.push('/');
                        }}
                    >
                        <BiLogOut />
                    </a>
                )}
            </div>
        </>
    );
};

export default CmsHeader;
