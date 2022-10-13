import Link from 'next/link';
import { FC, ReactNode } from 'react';

import styles from './TextBanner.module.scss';

interface IProps {
    intro?: string;
    title: string;
    description: string;
    link?: { href: string; content: ReactNode };
}

const TextBanner: FC<IProps> = ({ intro, title, description, link }) => {
    return (
        <div className={styles.textBanner}>
            <div className={styles.textBannerCenter}>
                {!!intro && <p className={styles.intro}>{intro}</p>}
                <h2>{title}</h2>
                <p className={styles.description}>{description}</p>
                {!!link && (
                    <p className={styles.link}>
                        <Link href={link.href}>
                            <a>{link.content}</a>
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default TextBanner;
