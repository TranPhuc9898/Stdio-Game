import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IArticle } from '@stdio/configs/custom-types';
import { AppState } from '../../../redux';

// import { commentActions } from '../../../redux/commentSlice';
import { L } from '@stdio/public/locales/langs';
import { useMui } from '../../../mui/global/MUI';

import styles from './Comment.module.scss';

interface IProps {
    article: IArticle;
}

const Comment: FC<IProps> = ({ article }) => {
    const { m } = useMui();
    const { t } = useTranslation('common');

    const { isLoggedIn } = useSelector((state: AppState) => state.auth);

    // const { parentComments, mapChildComments, lastId, userComments } = useSelector((state: AppState) => state.comment);

    const [isShowReply, setIsShowReply] = useState<{ [index: string]: boolean }>({});
    const [selectedParentId, setSelectedParentId] = useState('');
    const [currentLoading, setCurrentLoading] = useState<{ id: string | null; loading: boolean }>({
        id: null,
        loading: false,
    });

    useEffect(() => {
        loadComments();
        loadUserComments();
    }, [article]);

    // useEffect(() => {
    //     scroller.scrollTo(`${selectedParentId}-${article._id}`, {
    //         smooth: true,
    //         offset: -100
    //     });
    // }, [isShowReply]);

    // useEffect(() => {
    //     setCurrentLoading({
    //         id: null,
    //         loading: false,
    //     });
    // }, [parentComments, mapChildComments]);

    const onClickReply = async (parentId: string = '') => {
        if (isLoggedIn) {
            setSelectedParentId(parentId);
            setIsShowReply({ ...isShowReply, [parentId]: true });
        } else {
            m.message('info', t(L.SuggestLogin));
        }
    };

    const onClickCancelReply = (parentId: string = '') => {
        if (isLoggedIn) {
            setSelectedParentId('');
            setIsShowReply({ ...isShowReply, [parentId]: false });
        }
    };

    const loadChildComments = async (parentCommentId: string, lastId: string) => {
        setCurrentLoading({
            id: parentCommentId,
            loading: true,
        });
        // await dispatch(commentActions.getChildComments(false, parentCommentId, articleId, lastId));
    };

    const loadComments = async (isReload: boolean = true) => {
        if (!isReload) {
            setCurrentLoading({
                id: null,
                loading: true,
            });
        }
        // await dispatch(commentActions.loadComments(isReload, article._id));
    };

    const loadUserComments = async (isReload: boolean = true) => {
        if (!isReload) {
            setCurrentLoading({
                id: null,
                loading: true,
            });
        }
        // await dispatch(commentActions.getUserComments(article._id));
    };

    return (
        <div className={styles.commentSection}>
            <div className={styles.commentForm}>
                {/* <CommentBox parentId={null} articleId={article._id} /> */}
            </div>

            {/* {parentComments && parentComments.length > 0 && (
                <div className={styles.comments}>
                    {userComments.concat(parentComments).map((comment) => {
                        const { _id: parentCommentId } = comment;
                        return (
                            <div className={styles.comment} key={parentCommentId}>
                                <div className={styles.main}>
                                    <CommentChild comment={comment} onClickReply={() => onClickReply(parentCommentId)} />
                                </div>
                                <div className={styles.replySection}>
                                    <div className={styles.replies}>
                                        {mapChildComments.data[parentCommentId] &&
                                            mapChildComments.data[parentCommentId].map((reply) => {
                                                return (
                                                    <div key={reply._id} className={styles.reply}>
                                                        <div className={styles.main}>
                                                            <CommentChild comment={reply} onClickReply={() => onClickReply(parentCommentId)} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    {!!mapChildComments.lastId[parentCommentId] && (
                                        <>
                                            {currentLoading.id === parentCommentId && currentLoading.loading && (
                                                <div className={styles.more}>
                                                    <LoadingOutlined spin />
                                                </div>
                                            )}

                                            {!currentLoading.loading && (
                                                <div
                                                    className={styles.more}
                                                    onClick={() => loadChildComments(parentCommentId, mapChildComments.lastId[parentCommentId])}
                                                >
                                                    Xem thêm trả lời <IoCaretDown />
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {!!isShowReply[parentCommentId] && (
                                        <div className={styles.replyForm}>
                                            <CommentBox
                                                parentId={parentCommentId}
                                                articleId={article._id}
                                                onClickCancel={() => onClickCancelReply(parentCommentId)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )} */}

            {/* {!!lastId && (
                <>
                    {currentLoading.id === null && currentLoading.loading && (
                        <div className={styles.more}>
                            <LoadingOutlined spin />
                        </div>
                    )}
                    {!currentLoading.loading && (
                        <div className={styles.more} onClick={() => loadComments(false)}>
                            Xem thêm thảo luận <IoCaretDown />
                        </div>
                    )}
                </>
            )} */}
        </div>
    );
};

export default Comment;
