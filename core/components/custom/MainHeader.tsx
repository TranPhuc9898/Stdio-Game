import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { IoApps, IoFileTrayFull, IoMail, IoPencil } from 'react-icons/io5';

import { SITE_NAME } from '@stdio/configs/config';
import BasicMenu, { IBasicMenuItem } from '@stdio/core/mui/wrappers/BasicMenu';

import styles from './MainHeader.module.scss';
import { L } from '@stdio/public/locales/lang';

interface IProps {}

const MainHeader: FC<IProps> = () => {
    const { t } = useTranslation('common');

    const router = useRouter();


    const mobileBasicMenuRef = useRef<any>(null);

    const menu: IBasicMenuItem[] = [
        
        {
            icon: <IoApps />,
            action: { href: '/apps', pathnames: ['/apps', '/app/[appSlug]'] },
            text: t(L.Apps),
        },
        {
            icon: <IoMail />,
            action: { href: '/contact', pathnames: ['/contact'] },
            text: t(L.Contact),
        },
        {
            icon: <IoFileTrayFull />,
            action: {
                href: '/articles',
                pathnames: [
                    '/articles',
                    '/search',
                    '/article/[articleSlug]',
                    '/[boardSlug]/[articleSlug]',
                ],
            },
            text: 'Blog',
        },
    ];

    const MainMenu = () => (
        <ul>
            {menu.map((item: IBasicMenuItem, i: number) => {
                if (!!item.children) {
                    return (
                        <li key={i}>
                            <a
                                role="button"
                                aria-haspopup="true"
                                onClick={(e) => {
                                    mobileBasicMenuRef.current
                                        .update(item.children)
                                        .current.open(e);
                                }}
                            >
                                {item.text}
                            </a>
                        </li>
                    );
                }

                return (
                    !!item.action &&
                    typeof item.action !== 'function' && (
                        <li key={i}>
                            <Link href={item.action.href}>
                                <a
                                    className={classnames({
                                        [styles.active]: item.action.pathnames.includes(
                                            router.pathname,
                                        ),
                                    })}
                                >
                                    {item.text}
                                </a>
                            </Link>
                        </li>
                    )
                );
            })}
        </ul>
    );

    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.mainHeaderCenter}>
                    <div className={styles.info}>
                        <Link href="/">
                            <a className={styles.logo}>
                                <span>
                                    <img src="/static/logo-stdio.svg" alt={SITE_NAME} />
                                </span>
                                <span>
                                    <img src="/static/logo-stdio-text.svg" alt={SITE_NAME} />
                                </span>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.mainMenu}>
                        <MainMenu />
                        <div
                            aria-haspopup="true"
                            className={styles.button}
                            onClick={(e) => {
                                mobileBasicMenuRef.current.update(menu).current.open(e);
                            }}
                        >
                            <IoIosMenu />
                        </div>
                    </div>
                </div>
            </div>
            <BasicMenu ref={mobileBasicMenuRef} defaultItems={menu} />
        </>
    );
};

export default MainHeader;
