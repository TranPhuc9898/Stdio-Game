import { IconButton } from '@mui/material';
import Link from 'next/link';
import { FC, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import { IArticle } from '@stdio/configs/custom-types';
import { getArticleUrl, getMediaURL } from '@stdio/core/libs/custom-utils';
import { AppState } from '@stdio/core/redux';
import EditorPopover from './EditorPopover';

//style
import styles from './ArticleItemLite.module.scss';
import { isEmpty } from 'lodash';

interface IProps {
    article: IArticle;
}

const ArticleItemLight: FC<IProps> = ({ article }) => {
    const { isLoggedIn, role } = useSelector((state: AppState) => state.auth);
    const editorPopoverRef = useRef<any>(null);

    const src = getMediaURL(((article?.thumbnailSquare ?? []) as string[])[3]);

    return (
        <div className={styles.articleItemLite}>
            <p>
                <Link href={getArticleUrl(article)}>
                    <a className={styles.thumbnailSecond}>
                        <img src={src} alt={article?.title ?? ''} />
                        <span>
                            {isEmpty(article?.headline ?? '')
                                ? article?.description ?? ''
                                : article?.headline ?? ''}
                        </span>
                    </a>
                </Link>
            </p>
            <h2>
                <Link href={getArticleUrl(article)}>
                    <a>{article?.title ?? ''}</a>
                </Link>
            </h2>
            {isLoggedIn && role === 'editor' && (
                <>
                    <IconButton
                        className={styles.editButton}
                        onClick={(e) => {
                            editorPopoverRef?.current?.open?.(e);
                        }}
                    >
                        <IoCaretDown />
                    </IconButton>
                    <EditorPopover ref={editorPopoverRef} id={article?._id ?? ''} type="article" />
                </>
            )}
        </div>
    );
};

export default ArticleItemLight;
