import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useMui } from '@stdio/core//mui/global/MUI';

import styles from './CommentBox.module.scss';

interface IProps {
    parentId: string | null;
    articleId: string;
    onClickCancel?: (parentId: string) => void;
}

const CommentBox: FC<IProps> = ({ parentId, articleId, onClickCancel }) => {
    const { m } = useMui();
    const { t } = useTranslation('common');

    // const dispatch = useDispatch();
    // const router = useRouter();

    // const { isLoggedIn, role } = useSelector((state: AppState) => state.auth);
    // if (isLoggedIn && !includes(['reader', 'writer'], role)) return null;

    // const { profile } = useSelector((state: AppState) => state.me);
    // const editorPrivilege = role === 'editor';

    const editorRef = useRef<any>(null);

    const postComment = async () => {
        const newContent = editorRef?.current.currentContent ?? '';

        if (newContent.trim()) {
            // await dispatch(commentActions.createComment(articleId, newContent, parentId));
            editorRef.current.editor.setContent('');
        }
    };

    return (
        <div className={styles.commentBox}>
            {/* <div className={styles.picture}>
                <a href={isLoggedIn ? `/@${profile?.username ?? ''}` : '/auth/login'}>
                    <img
                        src={getMediaURL(profile?.picture[6] ?? '')}
                        alt={isLoggedIn ? profile?.lastName ?? '' + ' ' + profile?.firstName ?? '' : SITE_NAME}
                    />
                </a>
            </div>

            <div className={styles.form}>
                <main>
                    {isLoggedIn && !editorPrivilege ? (
                        <CommentEditor articleId={articleId} editorRef={editorRef} disabled={!isLoggedIn} />
                    ) : (
                        <div className={styles.pseudoComment}>
                            <div className={styles.pseudoCommentBar}>
                                <BoldOutlined />
                                <ItalicOutlined />
                                <LinkOutlined />
                                <OrderedListOutlined />
                                <UnorderedListOutlined />
                            </div>
                            <p>
                                Để tham gia thảo luận, vui lòng{' '}
                                <Link as="/auth/login" href="/auth/[auth]">
                                    <a>{t(L.Login)}</a>
                                </Link>{' '}
                                hoặc{' '}
                                <Link as="/auth/sign-up" href="/auth/[auth]">
                                    <a>{t(L.SignUp)}</a>
                                </Link>
                                .
                            </p>
                        </div>
                    )}
                </main>
                <footer>
                    {parentId && (
                        <a role="button" className={styles.button} onClick={() => onClickCancel(parentId)}>
                            {t(L.Cancel)}
                        </a>
                    )}
                    {isLoggedIn ? (
                        <a role="button" className={styles.button} onClick={postComment}>
                            {t(L.Send)}
                        </a>
                    ) : (
                        <Link href="/auth/login">
                            <a className={styles.button}>{t(L.Login)}</a>
                        </Link>
                    )}
                </footer>
            </div> */}
        </div>
    );
};

export default CommentBox;
