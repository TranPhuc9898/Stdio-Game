import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { IComment } from '@stdio/configs/custom-types';

import { useMui } from '../../../mui/global/MUI';

// import { commentActions } from '../../../redux/commentSlice';

import styles from './CommentChild.module.scss';

interface IProps {
    comment: IComment;
    onClickReply: () => void;
}

const CommentChild: FC<IProps> = ({ comment, onClickReply }) => {
    const { m } = useMui();
    const { t } = useTranslation('common');

    // const dispatch = useDispatch();
    // const { isLoggedIn, userId, role } = useSelector((state: AppState) => state.auth);

    const like = async () => {
        // const likeable = includes(['writer', 'reader'], role);
        // if (isLoggedIn && likeable) await dispatch(commentActions.likeComment(comment._id));
        // else m.message('info', t(L.SuggestLogin));
    };

    const checkLike = (likes: any[] = []) => {
        // if (isLoggedIn) return !isEmpty(likes.filter((l) => isEqual(l.userId, userId)));
        // return false;
    };

    const { user, createdAt, content, likes } = comment;
    // const { username, lastName, firstName, picture } = user;

    return (
        <div className={styles.commentChild}>
            {/* <div className={styles.picture}>
                <a href={`/@${username}`}>
                    <img src={getMediaURL(!picture ? '' : picture[6])} />
                </a>
            </div>
            <div className={styles.comment}>
                <h4>
                    <a href={`/@${username}`}>
                        {lastName} {firstName}
                    </a>
                    <span className={styles.createdAt}>{Utils.formatRelativeTime(createdAt)}</span>
                </h4>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
                <div className={styles.actions}>
                    <div className={styles.button} onClick={like}>
                        <div className={styles.icon}>{checkLike(likes) ? <HeartTwoTone twoToneColor="#ff0000" /> : <HeartOutlined />}</div>
                        <div className={styles.info}>{likes.length}</div>
                    </div>
                    <div className={styles.button} onClick={onClickReply}>
                        <div className={styles.info}>Trả lời</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default CommentChild;
