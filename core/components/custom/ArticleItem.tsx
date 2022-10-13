import { IconButton } from '@mui/material';
import { AppState } from '@stdio/core/redux';
import classnames from 'classnames';
import Link from 'next/link';
import { FC, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import { IArticle, TArticleThumbnailLevel } from '@stdio/configs/custom-types';
import { getArticleUrl, getMediaURL } from '@stdio/core/libs/custom-utils';
import { strTrunc } from '@stdio/core/libs/utils';
import EditorPopover from './EditorPopover';

import styles from './ArticleItem.module.scss';

interface IProps {
    article: IArticle;
    direction: 'vertical' | 'horizontal';
    lite?: boolean;
    thumbnail?: {
        shape: 'hd' | 'square';
        level: TArticleThumbnailLevel;
    };
    credit?: boolean;
    boardSlug?: string;
}

const ArticleItem: FC<IProps> = ({
    article,
    direction = 'vertical',
    lite = false,
    thumbnail = {
        shape: 'hd',
        level: 3,
    },
    boardSlug = null,
}) => {
    const { isLoggedIn, role } = useSelector((state: AppState) => state.auth);
    const editorPopoverRef = useRef<any>(null);

    const src = getMediaURL(
        thumbnail.shape === 'hd'
            ? (article?.thumbnailHD ?? [])[thumbnail.level] ?? ''
            : (article?.thumbnailSquare ?? [])[thumbnail.level] ?? '',
    );

    return (
        <div className={classnames(styles.articleItem, styles[direction])}>
            <div className={styles.thumbnail}>
                <Link href={getArticleUrl(article, boardSlug)}>
                    <a className={styles[thumbnail.shape]}>
                        <img src={src} alt={article?.title ?? ''} />
                    </a>
                </Link>
            </div>
            <div className={styles.content}>
                <h2>
                    <Link href={getArticleUrl(article, boardSlug)}>
                        <a>{article?.title ?? ''}</a>
                    </Link>
                </h2>
                <p>{!lite && strTrunc(article?.description ?? '', 128, '...')}</p>
            </div>
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

export default ArticleItem;
