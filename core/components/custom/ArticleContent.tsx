import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { FC } from 'react';

import styles from './ArticleContent.module.scss';

interface IProps {
    content: string;
}

const ArticleContent: FC<IProps> = ({ content }) => {
    if (isEmpty(content)) return null;

    return (
        <div
            className={classnames(styles.articleContent)}
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        ></div>
    );
};

export default ArticleContent;
