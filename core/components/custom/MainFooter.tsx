import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineEnvironment, AiOutlineFile, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

import { SITE_NAME } from '@stdio/configs/config';

import styles from './MainFooter.module.scss';
import { L } from '@stdio/public/locales/lang';

interface IProps {}

const MainFooter: FC<IProps> = () => {
    const { t } = useTranslation('common');

    const home = [
        {
            href: '/',
            text: t(L.Home),
        },
        {
            href: '/apps',
            text: t(L.Apps),
        },
        {
            href: '/contact',
            text: t(L.Contact),
        },
        {
            href: '/articles',
            text: t(L.Blog),
        },
    ];

    const connections = [
        {
            title: t(L.FeaturedApps),
            links: [
                {
                    href: '/pixel-ruler',
                    text: 'Pixel Ruler',
                },
                {
                    href: '/pissa-ruler',
                    text: 'Pissa Ruler',
                },
                {
                    href: '/pixel-colour',
                    text: 'Pixel Colour',
                },
            ],
        },
        {
            title: t(L.Community),
            links: [
                {
                    href: 'https://twitter.com/stdio_vn',
                    text: t(L.Twitter),
                },
                {
                    href: 'https://www.fb.com/stdio.vn',
                    text: t(L.Facebook),
                },
            ],
        },
        {
            title: t(L.Legal),
            links: [
                {
                    href: '/stdio/chinh-sach-quyen-rieng-tu-51xqu1',
                    text: t(L.PrivacyPolicy),
                },
                {
                    href: '/stdio/thoa-thuan-su-dung-dich-vu-stdio-c1kmL',
                    text: t(L.TermOfUse),
                },
            ],
        },
    ];

    return (
        <div className={styles.mainFooter}>
            <div className={styles.logo}>
                <img src="/static/logo-stdio-full-dark.svg" height="64" />
            </div>
            <div className={styles.menu}>
                <ul className={styles.menuCenter}>
                    {home.map((item, i) => (
                        <li key={i}>
                            <Link href={item.href}>
                                <a>{item.text}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.connection}>
                <div className={styles.connectionCenter}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <a>
                                <img
                                    src="/static/logo-stdio.svg"
                                    title={SITE_NAME}
                                    alt={SITE_NAME}
                                    width={48}
                                    height={48}
                                />
                            </a>
                        </Link>
                    </div>
                    {connections.map((connection, i) => (
                        <div key={i}>
                            <h3>{connection.title}</h3>
                            <ul>
                                {connection.links.map((link, j) => (
                                    <li key={j}>
                                        <Link href={link.href}>
                                            <a>{link.text}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className={styles.contact}>
                        <h3>{t(L.StdioCompanyName)}</h3>
                        <p>
                            <AiOutlineEnvironment /> <>{t(L.StdioContactAddress)}</>
                            <br />
                            <AiOutlinePhone /> <>{t(L.StdioPhoneNumber)}</>
                            <br />
                            <AiOutlineMail /> <>{t(L.StdioContactEmail)}</>
                        </p>
                        <p>
                            <AiOutlineEnvironment /> <>{t(L.StdioCompanyAddress)}</>
                            <br />
                            <AiOutlineFile /> <>{t(L.StdioBusinessProof)}</>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.credit}>
                ©{t(L.Stdio)}, 2013 - {new Date().getFullYear()}
            </div>
        </div>
    );
};

export default MainFooter;
