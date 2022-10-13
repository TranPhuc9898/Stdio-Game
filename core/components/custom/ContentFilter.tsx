import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import styles from './ContentFilter.module.scss';

interface ILink {
    key?: string;
    href: string;
    query?: any;
    content: any;
}

interface IProps {
    links: ILink[];
    samePage?: boolean;
    selected?: string;
}

const ContentFilter: FC<IProps> = ({ links = [], samePage = false, selected = '' }) => {
    const route = useRouter();

    return (
        <div className={styles.contentFilter}>
            <Scrollbars autoHide universal>
                <ul>
                    {links.map((link, i: number) => (
                        <li key={i}>
                            <Link
                                href={{
                                    pathname: link.href,
                                    query: { ...link.query },
                                }}
                            >
                                <a
                                // className={classnames({
                                //   [styles.active]:
                                //     selected != ""
                                //       ? selected === link.key
                                //       : !!samePage
                                //       ? route.asPath === link.as
                                //       : route.pathname === link.href,
                                // })}
                                >
                                    {link.content}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Scrollbars>
        </div>
    );
};

export default ContentFilter;
