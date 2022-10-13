import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { IoPerson, IoPersonAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { TFollowRelationship } from '@stdio/configs/custom-types';
import { L } from '@stdio/public/locales/langs';

import styles from './FollowButton.module.scss';

interface IProps {
    round?: boolean;
    size?: 'small' | 'medium' | 'large';
    targetProfileId?: string;
    onChangeSuccess?: VoidFunction;
}

const FollowButton: FC<IProps> = ({ round, size = 'small', targetProfileId, onChangeSuccess }) => {
    const { t } = useTranslation('commont');
    const dispatch = useDispatch();

    //   const authState = useSelector((state: AppState) => state.auth);
    //   const { profile } = useSelector((state: AppState) => state.me);
    //   const isLoggedIn = get(authState, "isLoggedIn", false);

    const [relationship, setRelationship] = useState<TFollowRelationship>('notSet');

    //   useEffect(() => {
    //     if (!isLoggedIn || !profile) return;

    //     if (targetProfileId === profile._id) {
    //       setRelationship("me");
    //     } else {
    //       setRelationship(
    //         profile.following.includes(targetProfileId)
    //           ? "following"
    //           : "notFollowing"
    //       );
    //     }
    //   }, [profile]);

    if (relationship === 'me' || relationship === 'notSet') return null;

    return (
        <div
            className={classnames(styles.followButton, styles[size], {
                [styles.active]: relationship === 'following',
                [styles.round]: !!round,
            })}
            onClick={async () => {
                // if (!authState.isLoggedIn) {
                //   message.info(t(L.SuggestLogin));
                //   return;
                // }
                // loading(true);
                // const res: any = await dispatch(
                //   meActions.followUser(
                //     targetProfileId,
                //     relationship === "following" ? "unfollow" : "follow"
                //   )
                // );
                // if (res.success) {
                //   await dispatch(meActions.getProfile());
                //   onChangeSuccess && onChangeSuccess();
                // }
                // loading(false);
            }}
        >
            {relationship === 'following' ? (
                <>
                    <div className={styles.icon}>
                        <IoPerson />
                    </div>
                    <div className={styles.text}>
                        <>{t(L.Unfollow)}</>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.icon}>{<IoPersonAdd />}</div>
                    <div className={styles.text}>
                        <>{t(L.Follow)}</>
                    </div>
                </>
            )}
        </div>
    );
};

export default FollowButton;
