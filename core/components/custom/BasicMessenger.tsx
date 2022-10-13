import Link from 'next/link';
import { FC } from 'react';

import styles from './BasicMessenger.module.scss';

interface IProps {
    title: string;
    description: string;
    link?: { text: string; href: string };
}

const BasicMessenger: FC<IProps> = ({ title, description, link }) => {
    return (
        <div className={styles.basicMessenger}>
            <h3>{title}</h3>
            <p>{description}</p>
            {!!link && (
                <p>
                    <Link href={link.href}>
                        <a>{link.text}</a>
                    </Link>
                </p>
            )}
        </div>
    );
};

export default BasicMessenger;
