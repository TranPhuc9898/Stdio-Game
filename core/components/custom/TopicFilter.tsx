import classnames from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import styles from './TopicFilter.module.scss';

interface IProps {
    links: {
        key?: string;
        as: string;
        href: string;
        query?: any;
        content: any;
    }[];
    topic?: string;
}

const TopicFilter: FC<IProps> = ({ links = [], topic = '' }) => {
    return (
        <div className={styles.topicFilter}>
            <div className={styles.topicFilterCenter}>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    universal
                    renderTrackHorizontal={(props: any) => (
                        <div {...props} className="track-horizontal" />
                    )}
                    thumbSize={0}
                >
                    <ul>
                        {links.map((link: any, i: number) => (
                            <li key={i}>
                                <Link
                                    as={link.as}
                                    href={{
                                        pathname: link.href,
                                        query: { ...link.query },
                                    }}
                                >
                                    <a
                                        className={classnames({
                                            [styles.active]: topic === link.query.topic,
                                        })}
                                    >
                                        {link.content}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Scrollbars>
            </div>
        </div>
    );
};

export default TopicFilter;
