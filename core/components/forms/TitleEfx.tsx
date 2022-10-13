import { FC } from 'react';

import styles from './TitleEfx.module.scss';

interface IProps {
    title: string;
}

const TitleEfx: FC<IProps> = ({ title }) => {
    return (
        <>
            {title !== undefined && (
                <div className={styles.titleEfx}>
                    <div className={styles.text}>{title}</div>
                    <div className={styles.subText}></div>
                    <div className={styles.line}></div>
                </div>
            )}
        </>
    );
};

export default TitleEfx;
