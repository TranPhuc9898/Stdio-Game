import { Button, MenuItem, Stack, TextField } from '@mui/material';
import classnames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArticleEditor from '../editors/ArticleEditor';

import {
    BlobInfo,
    IApp,
    IArticle,
    IBoard,
    ICategory,
    IProfile,
    ITopic,
} from '@stdio/configs/custom-types';
import { ArticleAPI } from '@stdio/core/apis/ArticleAPI';

import { getMediaURL } from '@stdio/core/libs/custom-utils';

import { L } from '@stdio/public/locales/langs';

import { BoardAPI } from '@stdio/core/apis/BoardAPI';
import { CategoryAPI } from '@stdio/core/apis/CategoryAPI';
import { ProfileAPI } from '@stdio/core/apis/ProfileAPI';
import { TopicAPI } from '@stdio/core/apis/TopicAPI';
import ImageUploadEditor from '@stdio/core/mui/forms/ImageUploadEditor';
import { useMui } from '@stdio/core/mui/global/MUI';

import styles from './ArticleComposer.module.scss';

interface IProps {
    type: 'individual' | 'board' | 'editor';
    initialArticle: IArticle | undefined;
}

const ArticleComposer: FC<IProps> = ({ type, initialArticle }) => {
    const { t } = useTranslation('common');
    const { m } = useMui();

    const titleRef = useRef<any>(null);
    const slugRef = useRef<any>(null);
    const descriptionRef = useRef<any>(null);
    const headlineRef = useRef<any>(null);
    const seoDescriptionRef = useRef<any>(null);
    const contentRef = useRef<any>(null);
    const topicsRef = useRef<any>(null);
    const categoriesRef = useRef<any>(null);
    const internalAdsRef = useRef<any>(null);
    const externalAdsRef = useRef<any>(null);
    const writerRef = useRef<any>(null);
    const boardRef = useRef<any>(null);
    const appsRef = useRef<any>(null);

    const parentTopicRef = useRef<any>(null);
    const parentCategoryRef = useRef<any>(null);

    const thumbnailHdEditorRef = useRef<any>(null);
    const thumbnailSqEditorRef = useRef<any>(null);

    const [thumbnailSq, setThumbnailSq] = useState('');
    const [thumbnailHd, setThumbnailHd] = useState('');

    const [writers, setWriters] = useState<IProfile[]>([]);

    const [boards, setBoards] = useState<IBoard[]>([]);

    const [topics, setTopics] = useState<ITopic[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<ITopic | undefined>();

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();

    const getCategoriesByBoardId = (boardId: string) => {
        if (boardId === '') return;

        CategoryAPI.getCategoriesByBoardId(boardId, { tree: true })
            .then((resp) => {
                setCategories(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        BoardAPI.getBoards()
            .then((resp) => {
                setBoards(resp.data);
            })
            .catch((err) => {});

        TopicAPI.getTopics({ tree: true })
            .then((resp) => {
                setTopics(resp.data);
            })
            .catch((err) => {});

        ProfileAPI.getWriters()
            .then((resp) => {
                console.log();
                setWriters(resp.data);
            })
            .catch((err) => {});
    }, []);

    useEffect(() => {
        setThumbnailHd(getMediaURL((initialArticle?.thumbnailHD ?? [])[0] ?? ''));
        setThumbnailSq(getMediaURL((initialArticle?.thumbnailSquare ?? [])[0] ?? ''));

        getCategoriesByBoardId(initialArticle?.board?._id ?? '');

        const newSelectedTopic = topics.find(
            (t) =>
                !!t.children?.find((c) => c._id === ((initialArticle?.topics ?? [])[0]?._id ?? '')),
        );
        setSelectedTopic(newSelectedTopic);

        const newSelectedCategory = categories.find(
            (t) =>
                !!t.children?.find(
                    (c) => c._id === ((initialArticle?.categories ?? [])[0]?._id ?? ''),
                ),
        );
        setSelectedCategory(newSelectedCategory);
    }, [initialArticle, topics]);

    useEffect(() => {
        const newSelectedCategory = categories.find(
            (t) =>
                !!t.children?.find(
                    (c) => c._id === ((initialArticle?.categories ?? [])[0]?._id ?? ''),
                ),
        );
        setSelectedCategory(newSelectedCategory);
    }, [categories]);

    const save = () => {
        const content = contentRef?.current?.getContent?.() ?? initialArticle?.content;

        if (content === undefined || content.trim().length < 32) {
            m.message('error', 'Lưu thất bại, nội dung phải nhiều hơn 32 ký tự.');
            return;
        }

        const updatedArticle = {
            title: titleRef.current.value,
            slug: slugRef.current.value,
            headline: headlineRef.current.value,
            description: descriptionRef.current.value,
            seoDescription: seoDescriptionRef.current.value,
            topics: topicsRef.current.value !== '' ? [topicsRef.current.value] : [],
            categories: categoriesRef.current.value !== '' ? [categoriesRef.current.value] : [],
            board: boardRef.current.value,
            writer: writerRef.current.value,
            adsConfig: {
                externalAds: externalAdsRef?.current?.checked ?? false,
                internalAds: internalAdsRef?.current?.checked ?? false,
            },
            content,
            apps: ((appsRef?.current?.value ?? '') as string)
                .trim()
                .split('\n')
                .map((a) => a.trim())
                .filter((a) => a),
        };

        m.loading(true);

        ArticleAPI.updateArticle(initialArticle?._id ?? '', updatedArticle)
            .then((resp) => {
                m.message('success', 'Lưu thành công');
            })
            .catch((err) => {
                m.message('error', 'Lưu thất bại');
            })
            .finally(() => {
                m.loading(false);
            });
    };

    const uploadThumbnailHd = async (file: Blob) => {
        const resp = await ArticleAPI.updateThumbnailHD(initialArticle?._id as string, file);
        const thumbnails: string[] = resp.data;
        setThumbnailHd(getMediaURL(thumbnails[0] ?? ''));
    };

    const uploadThumbnailSq = async (file: Blob) => {
        const resp = await ArticleAPI.updateThumbnailSquare(initialArticle?._id as string, file);
        const thumbnails: string[] = resp.data;
        setThumbnailSq(getMediaURL(thumbnails[0] ?? ''));
    };

    const deleteThumbnailHd = () => {};
    const deleteThumbnailSq = () => {};

    const insertFile = (cb: any, value: any, meta: any) => {
        if (meta.filetype === 'file') {
            const input = document.createElement('input');

            input.setAttribute('type', 'file');
            input.setAttribute('accept', '.zip,.mp4');

            input.onchange = function () {
                if (!input.files) return;
                let file = input.files[0];

                m.loading(true);

                ArticleAPI.uploadContentFile(initialArticle?._id ?? '', file)
                    .then((resp) => {
                        const link = resp?.data.data ?? '';
                        if (link !== '') {
                            cb(getMediaURL(link), {
                                title: file.name,
                                text: file.name,
                            });
                        }
                    })
                    .catch(() => {})
                    .finally(() => m.loading(false));
            };

            input.click();
        }
    };

    const insertImage = (blobInfo: BlobInfo, progress: any) => {
        return new Promise<string>((resolve, reject) => {
            m.loading(true);

            ArticleAPI.uploadContentImage(initialArticle?._id ?? '', blobInfo)
                .then((resp) => {
                    const imageUrl = resp?.data?.data ?? '';

                    console.log(getMediaURL(imageUrl));

                    if (imageUrl !== '') resolve(getMediaURL(imageUrl));
                    else reject('Invalid data.');
                })
                .catch((err) => {
                    reject(err);
                })
                .finally(() => {
                    m.loading(false);
                });
        });
    };

    if (!initialArticle) return null;

    return (
        <>
            <div className={styles.articleComposer}>
                <div className={classnames(styles.col, styles.meta)}>
                    <div>
                        <Stack spacing={2}>
                            <TextField
                                label={t(L.Title)}
                                size="small"
                                fullWidth
                                inputRef={titleRef}
                                type="text"
                                defaultValue={initialArticle?.title ?? ''}
                            />
                            <TextField
                                label={t(L.Slug) + ' - Affect SEO'}
                                size="small"
                                fullWidth
                                inputRef={slugRef}
                                type="text"
                                defaultValue={initialArticle?.slug ?? ''}
                            />
                            <TextField
                                label={t(L.Headline)}
                                multiline
                                rows={2}
                                size="small"
                                fullWidth
                                inputRef={headlineRef}
                                type="text"
                                defaultValue={initialArticle?.headline ?? ''}
                            />
                            <TextField
                                label={t(L.SeoDescription)}
                                multiline
                                rows={3}
                                size="small"
                                fullWidth
                                inputRef={seoDescriptionRef}
                                type="text"
                                defaultValue={initialArticle?.seoDescription ?? ''}
                            />
                            <TextField
                                label={t(L.Description)}
                                multiline
                                rows={3}
                                size="small"
                                fullWidth
                                inputRef={descriptionRef}
                                type="text"
                                defaultValue={initialArticle?.description ?? ''}
                            />
                            {initialArticle && writers.length > 0 && (
                                <TextField
                                    select
                                    label={t(L.Authors)}
                                    size="small"
                                    fullWidth
                                    defaultValue={initialArticle?.writer?._id ?? ''}
                                    inputRef={writerRef}
                                >
                                    {writers.map((w) => (
                                        <MenuItem key={w._id} value={w._id}>
                                            {w.lastName} {w.firstName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                            <fieldset className={styles.fieldset}>
                                <legend>{t(L.Topics)}</legend>
                                <Stack spacing={2}>
                                    <TextField
                                        select
                                        label={t(L.Topic)}
                                        size="small"
                                        fullWidth
                                        inputRef={parentTopicRef}
                                        onChange={(e) => {
                                            setSelectedTopic(
                                                topics.find((t) => t._id === e.target.value),
                                            );
                                        }}
                                        value={selectedTopic?._id ?? ''}
                                    >
                                        <MenuItem value="">---</MenuItem>
                                        {topics.map((t) => (
                                            <MenuItem value={t._id} key={t._id}>
                                                {t.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    {selectedTopic !== undefined && (
                                        <TextField
                                            select
                                            label={t(L.SubTopic)}
                                            size="small"
                                            fullWidth
                                            defaultValue={
                                                (initialArticle?.topics ?? [])[0]?._id ?? ''
                                            }
                                            inputRef={topicsRef}
                                        >
                                            <MenuItem value="">---</MenuItem>
                                            {(selectedTopic?.children ?? []).map((t) => (
                                                <MenuItem key={t._id} value={t._id}>
                                                    {t.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                </Stack>
                            </fieldset>

                            <TextField
                                select
                                label={t(L.Boards)}
                                size="small"
                                fullWidth
                                inputRef={boardRef}
                                defaultValue={initialArticle?.board?._id ?? ''}
                                onChange={(e) => {
                                    if (e.target.value !== '') {
                                        getCategoriesByBoardId(e.target.value);
                                    } else {
                                        setCategories([]);
                                        setSelectedCategory(undefined);
                                    }
                                }}
                            >
                                <MenuItem value="">---</MenuItem>
                                {boards.map((board, i) => (
                                    <MenuItem value={board?._id ?? ''} key={i}>
                                        {board.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <fieldset className={styles.fieldset}>
                                <legend>{t(L.Categories)}</legend>
                                <Stack spacing={2}>
                                    <TextField
                                        select
                                        label={t(L.Category)}
                                        size="small"
                                        fullWidth
                                        value={selectedCategory?._id ?? ''}
                                        inputRef={parentCategoryRef}
                                        onChange={(e) => {
                                            setSelectedCategory(
                                                categories.find((c) => c._id === e.target.value),
                                            );
                                        }}
                                        disabled={categories.length == 0}
                                    >
                                        <MenuItem value="">---</MenuItem>
                                        {categories.map((c) => (
                                            <MenuItem key={c._id} value={c._id}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        select
                                        label={t(L.SubCategory)}
                                        size="small"
                                        fullWidth
                                        defaultValue={
                                            (initialArticle?.categories ?? [])[0]?._id ?? ''
                                        }
                                        inputRef={categoriesRef}
                                        disabled={selectedCategory === undefined}
                                    >
                                        <MenuItem value="">---</MenuItem>
                                        {(selectedCategory?.children ?? []).map((c) => (
                                            <MenuItem key={c._id} value={c._id}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                            </fieldset>
                            <TextField
                                label={t(L.Apps)}
                                multiline
                                rows={3}
                                size="small"
                                fullWidth
                                inputRef={appsRef}
                                type="text"
                                defaultValue={((initialArticle?.apps ?? []) as IApp[])
                                    .map((app) => app._id)
                                    .join('\n')
                                    .trim()}
                            />
                        </Stack>
                    </div>
                    <div>
                        <ArticleEditor
                            ref={contentRef}
                            initialValue={initialArticle?.content ?? ''}
                            onInsertFile={insertFile}
                            onInsertImage={insertImage}
                            onSave={save}
                        />
                    </div>
                </div>
                <div className={styles.col}>
                    <Stack spacing={2}>
                        <fieldset className={styles.fieldset}>
                            <legend>{t(L.ThumbnailHd)}</legend>
                            <img src={thumbnailHd} alt="" width={'100%'} />
                            <Stack direction="row" spacing={1}>
                                <Button
                                    onClick={() => {
                                        thumbnailHdEditorRef?.current?.open?.();
                                    }}
                                >
                                    Replace
                                </Button>
                                <Button onClick={() => {}}>Delete</Button>
                            </Stack>
                        </fieldset>
                        <fieldset className={styles.fieldset}>
                            <legend>{t(L.ThumbnailSq)}</legend>
                            <img src={thumbnailSq} alt="" width={'100%'} />
                            <Stack direction="row" spacing={1}>
                                <Button
                                    onClick={() => {
                                        thumbnailSqEditorRef?.current?.open?.();
                                    }}
                                >
                                    Replace
                                </Button>
                                <Button onClick={() => {}}>Delete</Button>
                            </Stack>
                        </fieldset>
                        <fieldset className={styles.fieldset}>
                            <legend>{t(L.Quicklinks)}</legend>
                            <ul>
                                <li>
                                    Article:{' '}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`/article/${initialArticle?.slug ?? ''}-${
                                            initialArticle?.internalId ?? ''
                                        }`}
                                    >
                                        {initialArticle?.title ?? ''}
                                    </a>{' '}
                                    - {initialArticle?._id ?? ''} -{' '}
                                    {initialArticle?.internalId ?? ''}
                                </li>
                                <li>
                                    Writer:{' '}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`/@${initialArticle?.writer?.username ?? ''}`}
                                    >
                                        {initialArticle?.writer?.lastName ?? ''}{' '}
                                        {initialArticle?.writer?.firstName ?? ''}
                                    </a>{' '}
                                    - {initialArticle?.writer?._id ?? ''}
                                </li>
                                {initialArticle?.board !== undefined && (
                                    <li>
                                        Board:{' '}
                                        <a
                                            target="_blank"
                                            rel="noreferrer"
                                            href={`/board/${initialArticle?.board?.slug ?? ''}`}
                                        >
                                            {initialArticle?.board?.name ?? ''}
                                        </a>{' '}
                                        - {initialArticle?.board?._id ?? ''}
                                    </li>
                                )}
                            </ul>
                        </fieldset>
                        <fieldset className={styles.fieldset}>
                            <legend>{t(L.Quicklinks)}</legend>
                            <ul>
                                <li>Save: Ctrl + Shift + S</li>
                                <li>Bold: Ctrl + B</li>
                                <li>Italic: Ctr + I</li>
                                <li>Code: Ctr + Shift + C</li>
                                <li>Pre: Ctr + Shift + X</li>
                            </ul>
                        </fieldset>
                    </Stack>
                </div>
            </div>
            <ImageUploadEditor
                ref={thumbnailHdEditorRef}
                cropWidth={1280}
                cropHeight={720}
                borderRadius={0}
                onUpload={uploadThumbnailHd}
            />
            <ImageUploadEditor
                ref={thumbnailSqEditorRef}
                cropWidth={1024}
                cropHeight={1024}
                borderRadius={0}
                onUpload={uploadThumbnailSq}
            />
        </>
    );
};

export default ArticleComposer;
