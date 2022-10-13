import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { IoIosAddCircleOutline, IoMdCheckmarkCircle } from 'react-icons/io';

import { TSubcribe } from '@stdio/configs/custom-types';
import { L } from '@stdio/public/locales/langs';

import styles from './SubscribeButton.module.scss';

interface IProps {
    round?: boolean;
    size?: 'small' | 'medium' | 'large';
    boardId?: string;
    onChangeSuccess?: VoidFunction;
}

const SubscribeButton: FC<IProps> = ({ round, size = 'small', boardId, onChangeSuccess }) => {
    const { t } = useTranslation('common');
    // const dispatch = useDispatch();

    //   const authState = useSelector((state: AppState) => state.auth);
    //   const { profile } = useSelector((state: AppState) => state.me);
    //   const isLoggedIn = get(authState, "isLoggedIn", false);

    const [relationship, setRelationship] = useState<TSubcribe>('notSet');

    //   useEffect(() => {
    //     if (!isLoggedIn || !profile) return;
    //     setRelationship(
    //       profile.subscribing.includes(boardId) ? "subscribing" : "notSubscribing"
    //     );
    //   }, [profile]);

    if (relationship === 'notSet') return null;

    return (
        <div
            className={classnames(styles.subscribeButton, styles[size], {
                [styles.active]: relationship === 'subscribing',
                [styles.round]: !!round,
            })}
            onClick={async () => {
                // if (!authState.isLoggedIn) {
                //   message.info(t(LANG.SuggestLogin));
                //   return;
                // }
                // loading(true);
                // const res: any = await dispatch(
                //   meActions.subscribeBoard(
                //     boardId,
                //     isEqual(relationship, "subscribing") ? "unsubscribe" : "subscribe"
                //   )
                // );
                // if (res.success) {
                //   await dispatch(boardActions.getBoardById(boardId));
                //   await dispatch(meActions.getProfile());
                //   onChangeSuccess && onChangeSuccess();
                // } else if (!res.success) {
                // }
                // loading(false);
            }}
        >
            {relationship === 'subscribing' ? (
                <>
                    <div className={styles.icon}>
                        <IoMdCheckmarkCircle />
                    </div>
                    <div className={styles.text}>
                        <>{t(L.Unsubscribe)}</>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.icon}>
                        <IoIosAddCircleOutline />
                    </div>
                    <div className={styles.text}>
                        <>{t(L.Subscribe)}</>
                    </div>
                </>
            )}
        </div>
    );
};

export default SubscribeButton;
