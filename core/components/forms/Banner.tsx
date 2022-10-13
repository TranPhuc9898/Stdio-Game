import classNames from 'classnames';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';

import styles from './Banner.module.scss';

interface IProps {
    banners: { title: string; image: string; link: string }[];
}

const Banner: FC<IProps> = ({ banners }) => {
    const [status, setStatus] = useState<'idle' | 'forward' | 'backward'>('idle');

    const current = useRef(0);
    const next = useRef(0);

    const idleDuration = 7000;
    const animDuration = 1000;

    const statusTimeOutRef = useRef<NodeJS.Timeout | null>(null);

    // useEffect(() => {
    //     if (banners.length === 0) return;
    //     setStatus(status === 'idle' ? 'forward' : 'idle');
    // }, [banners]);

    useEffect(() => {
        if (banners.length === 0) return;

        if (!!statusTimeOutRef.current) clearTimeout(statusTimeOutRef.current);

        if (status === 'idle') {
            statusTimeOutRef.current = setTimeout(() => {
                next.current = (current.current + 1) % banners.length;
                setStatus('forward');
            }, idleDuration);
        } else {
            statusTimeOutRef.current = setTimeout(() => {
                current.current = next.current;
                setStatus('idle');
            }, animDuration);
        }
    }, [status]);

    if (banners.length === 0) return null;

    const BannerImage = () => (
        <>
            {status === 'idle' ? (
                <Link href={banners[current.current]?.link ?? ''}>
                    <a>
                        <div
                            className={styles.thumbnail}
                            style={{
                                backgroundImage: `url(${banners[current.current]?.image ?? ''})`,
                            }}
                        >
                            <div className={styles.title}>
                                <span>{banners[current.current]?.title ?? ''}</span>
                            </div>
                        </div>
                    </a>
                </Link>
            ) : status === 'forward' ? (
                <>
                    <div
                        className={classNames(styles.thumbnail, styles.currentMoveLeft)}
                        style={{ backgroundImage: `url(${banners[current.current]?.image ?? ''})` }}
                    >
                        <div className={styles.title}>
                            <span>{banners[current.current]?.title ?? ''}</span>
                        </div>
                    </div>
                    <div
                        className={classNames(styles.thumbnail, styles.nextMoveLeft)}
                        style={{ backgroundImage: `url(${banners[next.current]?.image ?? ''})` }}
                    >
                        <div className={styles.title}>
                            <span>{banners[next.current]?.title ?? ''}</span>
                        </div>
                    </div>
                </>
            ) : status === 'backward' ? (
                <>
                    <div
                        className={classNames(styles.thumbnail, styles.currentMoveRight)}
                        style={{ backgroundImage: `url(${banners[current.current]?.image ?? ''})` }}
                    >
                        <div className={styles.title}>
                            <span>{banners[current.current]?.title ?? ''}</span>
                        </div>
                    </div>
                    <div
                        className={classNames(styles.thumbnail, styles.previousMoveRight)}
                        style={{ backgroundImage: `url(${banners[next.current]?.image ?? ''})` }}
                    >
                        <div className={styles.title}>
                            <span>{banners[next.current]?.title ?? ''}</span>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );

    return (
        <>
            <div className={styles.banner}>
                <div className={styles.thumbnails}>
                    <BannerImage />
                </div>
                <div className={styles.navigations}>
                    {banners.map((banner, i) => (
                        <div
                            key={i}
                            className={classNames(styles.dot, {
                                [styles.active]: current.current === i,
                            })}
                            onClick={() => {
                                if (current.current === i) return;
                                setStatus(current.current < i ? 'forward' : 'backward');
                                next.current = i;
                            }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Banner;
