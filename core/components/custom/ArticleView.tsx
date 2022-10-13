import { IconButton } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { IoCaretDown, IoFolderOutline, IoList, IoShareSocialOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import { getClientContents, getMediaURL } from '@stdio/core/libs/custom-utils';
import { formatDate } from '@stdio/core/libs/utils';
import ArticleContent from './ArticleContent';

import { L } from '@stdio/public/locales/langs';

import { IApp, IArticle } from '@stdio/configs/custom-types';

import { SITE_URL } from '@stdio/configs/config';
import SharePopover from '@stdio/core/mui/forms/SharePopover';
import BasicDrawer, { TAnchor } from '@stdio/core/mui/wrappers/BasicDrawer';
import { AppState } from '@stdio/core/redux';

import Pipeline from '../forms/Pipeline';
import AppItemLite from './AppItemLite';
import ArticleSearch from './ArticleSearch';
import EditorPopover from './EditorPopover';

import styles from './ArticleView.module.scss';
import ArticleItemLite from './ArticleItemLite';

interface IProps {
    article: IArticle;
    suggestedArticles: IArticle[];
}

const ArticleView: FC<IProps> = ({ article = {} as IArticle, suggestedArticles }) => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const { isLoggedIn, role } = useSelector((state: AppState) => state.auth);
    const editorPopoverRef = useRef<any>(null);

    const username = article?.writer?.username ?? '';
    const firstName = article?.writer?.firstName ?? '';
    const lastName = article?.writer?.lastName ?? '';
    const picture = getMediaURL(article?.writer?.picture[6] ?? '');

    const thumnailHD = getMediaURL((article?.thumbnailHD ?? [])[2] ?? '');

    const clientContent = getClientContents(article?.content ?? '');

    const apps = (article?.apps ?? []) as IApp[];

    const drawer: {
        anchor: TAnchor;
        width: number | string;
        height: number | string;
    } = {
        anchor: 'right',
        width: 500,
        height: '100%',
    };

    const [outlineIndex, setOutlineIndex] = useState<number>(0);

    const outlineDrawerRef = useRef<any>(null);
    const sharePopoverRef = useRef<any>(null);

    const onLike = async () => {
        // if (!isLoggedIn) {
        //   message.info(t(L.SuggestLogin));
        //   return;
        // }
        // const res: any = await dispatch(articleActions.likeArticle(article._id));
        // if (res.success) {
        //   setLikes(liked ? likes - 1 : likes + 1);
        //   setLiked(!liked);
        // }
    };

    const onBookmark = async () => {
        // if (!isLoggedIn) {
        //   message.info(t(L.SuggestLogin));
        //   return;
        // }

        if (article?._id ?? '' === '') {
            // message.error("Không thể đánh dấu bài viết này.");
            return;
        }

        // const res: any = await dispatch(userActions.bookMarkArticle(article._id));

        // if (res.success) {
        //   message.info(bookmarked ? "Huỷ bookmark." : "Đã bookmark.");
        //   setBookmarked(!bookmarked);
        // } else message.error("Không thể đánh dấu bài viết này.");
    };

    const findTopicByChildTopicId = (childTopicId: string) => {
        // const childTopic = find(topics, (topic) =>
        //   isEqual(topic._id, childTopicId)
        // );
        // return find(topics, (topic) => isEqual(topic._id, childTopic.parent));
    };

    const updateOutlineIndex = () => {
        if (typeof window === 'undefined') return;

        let minIndex = 0;
        let minDisctance = 99999999999999;

        const outline = clientContent.outline;

        for (let i = 0; i < outline.length; i++) {
            const element = document.getElementById(outline[i].id);
            if (element === null) continue;

            const distance = Math.abs(window.scrollY - element.offsetTop);
            if (distance < minDisctance) {
                minIndex = i;
                minDisctance = distance;
            }
        }

        setOutlineIndex(minIndex);
    };

    useEffect(() => {
        const sizeChangeCallback = () => {
            outlineDrawerRef?.current?.close?.();
        };

        addEventListener('resize', sizeChangeCallback);

        addEventListener('load', updateOutlineIndex);
        addEventListener('resize', updateOutlineIndex);
        addEventListener('scroll', updateOutlineIndex);
        return () => {
            removeEventListener('resize', sizeChangeCallback);

            removeEventListener('load', updateOutlineIndex);
            removeEventListener('resize', updateOutlineIndex);
            removeEventListener('scroll', updateOutlineIndex);
        };
    }, []);

    const Outline = ({ drawer = false }) => {
        const MainOutline = (
            <div className={styles.mainOutline}>
                <ul>
                    {clientContent.outline.map((title: any, i: number) => (
                        <li
                            key={i}
                            className={classnames(styles[title.tagName], {
                                [styles.active]: i === outlineIndex,
                            })}
                            onClick={() => {
                                const element = document.getElementById(title.id);
                                if (element === null) return;

                                window.scrollTo({
                                    top:
                                        element.getBoundingClientRect().top +
                                        window.pageYOffset -
                                        54 -
                                        10,
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: title.text,
                                }}
                            ></span>
                        </li>
                    ))}
                </ul>
            </div>
        );

        if (drawer) return MainOutline;
        else
            return (
                <div className={styles.outline}>
                    <div className={styles.header}>
                        <p>{t(L.Contents)}</p>

                        <div className={styles.buttons}>
                            <div
                                className={styles.button}
                                onClick={(e) => {
                                    sharePopoverRef?.current?.open?.(e);
                                }}
                            >
                                <span>
                                    <IoShareSocialOutline size={20} />
                                </span>
                                <span>{t(L.Share)}</span>
                            </div>
                        </div>
                    </div>
                    <Scrollbars autoHide universal>
                        {MainOutline}
                    </Scrollbars>
                </div>
            );
    };

    return (
        <>
            <div className={styles.articleView}>
                <ArticleSearch
                    initSearchTerm={(router?.query?.q as string) ?? ''}
                    placeholder={t(L.SearchHint)}
                    onSearch={(searchTerm: string) => {}}
                />

                <article className={styles.article}>
                    <div className={styles.articleCenter}>
                        <div className={styles.container}>
                            <div className={styles.post}>
                                <div className={styles.thumbnail}>
                                    <img src={thumnailHD} />
                                </div>

                                <div className={styles.main}>
                                    <div className={styles.topics}>
                                        <span>
                                            <IoFolderOutline />
                                        </span>
                                        {(article?.topics ?? []).map((topic, i) => (
                                            <a key={i}>{topic.name}</a>
                                        ))}
                                    </div>

                                    <h1>{article.title}</h1>
                                    <div className={styles.info}>
                                        <div className={styles.author}>
                                            <Link href={`/@${username}`}>
                                                <a>
                                                    <img
                                                        src={picture}
                                                        alt={`${lastName} ${firstName}`}
                                                        width={24}
                                                        height={24}
                                                    />
                                                </a>
                                            </Link>
                                            <Link href={`/@${username}`}>
                                                <a>
                                                    {lastName} {firstName}
                                                </a>
                                            </Link>
                                        </div>
                                        <div className={styles.extra}>
                                            <span title={t(L.LastUpdate)}>
                                                {formatDate(article?.updatedAt ?? 0)}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {Math.round(article?.reading?.minutes ?? 0)}{' '}
                                                {t(L.MinRead)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.description}>{article.description}</div>
                                    <div className={styles.content}>
                                        <ArticleContent content={clientContent.content} />
                                    </div>
                                </div>
                            </div>
                            {apps.length > 0 && (
                                <div className={styles.apps}>
                                    {apps.map((app, i) => (
                                        <AppItemLite app={app} key={i} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.sidebar}>
                            <Pipeline>
                                <Outline />
                            </Pipeline>
                        </div>
                    </div>
                </article>

                {suggestedArticles.length > 0 && (
                    <div className={styles.articleSection}>
                        <div className={styles.articleSectionCenter}>
                            <h2>{t(L.RelatedPosts)}</h2>
                            <ul>
                                {suggestedArticles.map(
                                    (article, i) =>
                                        i < 4 && (
                                            <li key={i}>
                                                <ArticleItemLite article={article} />
                                            </li>
                                        ),
                                )}
                            </ul>
                        </div>
                    </div>
                )}

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
                        <EditorPopover
                            ref={editorPopoverRef}
                            id={article?._id ?? ''}
                            type="article"
                        />
                    </>
                )}
            </div>

            <ul className={styles.controls}>
                <li
                    onClick={(e) => {
                        sharePopoverRef?.current?.open?.(e);
                    }}
                >
                    <div className={styles.icon}>
                        <IoShareSocialOutline size={18} />
                    </div>
                    <div className={styles.text}>
                        <>{t(L.Share)}</>
                    </div>
                </li>
                <li
                    onClick={() => {
                        outlineDrawerRef?.current?.open?.();
                    }}
                >
                    <div className={styles.icon}>
                        <IoList size={18} />
                    </div>
                    <div className={styles.text}>
                        <>{t(L.Content)}</>
                    </div>
                </li>
            </ul>

            <BasicDrawer
                ref={outlineDrawerRef}
                anchor={drawer.anchor}
                maxWidth={'90%'}
                maxHeight={drawer.height}
                title={t(L.Content)}
                useCloseButton={true}
                content={<Outline drawer={true} />}
            />

            <SharePopover
                ref={sharePopoverRef}
                text={article?.title ?? ''}
                link={`${SITE_URL}/article/r-${article?.internalId ?? ''}`}
            />
        </>
    );
};

export default ArticleView;
