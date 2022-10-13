import { FunctionComponent } from 'react';

import styles from './ServiceList.module.scss';

interface IProps {
    contents: {
        thumbnail: string;
        title: string;
        description?: string;
    }[];
    background?: string;
    color?: string;
}

const ServiceList: FunctionComponent<IProps> = ({ contents, background, color }) => {
    return (
        <div className={styles.serviceList} style={{ background, color }}>
            {contents.map((content) => {
                return (
                    <div className={styles.service}>
                        <div className={styles.thumbnail}>
                            <img src={content.thumbnail} alt={content.title} />
                        </div>
                        <div className={styles.content}>
                            <h3>{content.title}</h3>
                            <p>{content.description}</p>
                        </div>
                        <div className={styles.decor}></div>
                    </div>
                );
            })}
        </div>
    );
};

export default ServiceList;
