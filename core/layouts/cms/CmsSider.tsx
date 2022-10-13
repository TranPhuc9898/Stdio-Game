import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';

import { CMS_MENU } from './CmsSiderContext';

import styles from './CmsSider.module.scss';

interface IProps {}

const CmsSider: FC<IProps> = ({}) => {
    const { pathname } = useRouter();
    // const { role } = useSelector((state: AppState) => state.auth);

    const role = 'editor';

    const items = CMS_MENU[role] ? CMS_MENU[role] : [];

    return (
        <div className={styles.cmsSider}>
            <div className={styles.items}>
                {items.map((item, index) => (
                    <div
                        className={classnames(styles.itemBox, {
                            [styles.active]: item.link === pathname,
                        })}
                        key={index}
                    >
                        {item.link !== null ? (
                            <Link href={item.link}>
                                <a
                                    className={classnames(styles.item, {
                                        [styles.active]: item.link === pathname,
                                    })}
                                >
                                    <div className={styles.icon}>{item.icon}</div>
                                    <div className={styles.text}>{item.text}</div>
                                </a>
                            </Link>
                        ) : (
                            <div className={classnames(styles.item)}>
                                <div className={styles.icon}>{item.icon}</div>
                                <div className={styles.text}>{item.text}</div>
                            </div>
                        )}
                        {!!item.items && (
                            <div className={styles.subItems}>
                                {item.items.map(
                                    (subItem, jndex) =>
                                        !!subItem.link && (
                                            <Link href={subItem.link} key={`${index} ${jndex}`}>
                                                <a
                                                    className={classnames(styles.item, {
                                                        [styles.active]: subItem.link === pathname,
                                                    })}
                                                >
                                                    <div className={styles.icon}>
                                                        {subItem.icon}
                                                    </div>
                                                    <div className={styles.text}>
                                                        {subItem.text}
                                                    </div>
                                                </a>
                                            </Link>
                                        ),
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CmsSider;
