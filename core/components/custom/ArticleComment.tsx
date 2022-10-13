import { FC } from 'react';

import styles from './ArticleComment.module.scss';

interface IProps {}

const ArticleComment: FC<IProps> = () => {
    return <div className={styles.articleComment}></div>;
};

export default ArticleComment;
