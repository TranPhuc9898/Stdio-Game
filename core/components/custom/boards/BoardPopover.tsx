import { isEmpty } from 'lodash';
import Link from 'next/link';
import {
    forwardRef,
    ForwardRefRenderFunction,
    MouseEvent,
    useImperativeHandle,
    useRef,
} from 'react';
import { IoGlobeOutline, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';

import { getMediaURL } from '@stdio/core/libs/custom-utils';
import { reformatWebsiteLink } from '@stdio/core/libs/utils';
import BasicPopover from '@stdio/core/mui/wrappers/BasicPopover';

import styles from './BoardPopover.module.scss';

interface IProps {
    board?: any;
}

const BoardPopover: ForwardRefRenderFunction<unknown, IProps> = ({ board = null }, ref) => {
    const basicPopoverRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        open: (e: MouseEvent<HTMLElement>) => {
            if (basicPopoverRef.current) basicPopoverRef.current.open(e);
        },
        close: () => {
            if (basicPopoverRef.current) basicPopoverRef.current.close();
        },
    }));

    const logo = getMediaURL(board?.logo[4] ?? '');

    return (
        <BasicPopover
            ref={basicPopoverRef}
            content={
                <div className={styles.boardPopover}>
                    <div className={styles.header}>
                        <div className={styles.picture}>
                            <img
                                src={logo}
                                width={64}
                                height={64}
                                alt={`${board.lastName} ${board.firstName}`}
                            />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.profile}>
                                <div className={styles.name}>
                                    <h3>
                                        <Link href={`/${board.slug}`}>
                                            <a>{board.name}</a>
                                        </Link>
                                    </h3>
                                    <p>{board.description}</p>
                                </div>
                            </div>
                            <div className={styles.contacts}>
                                {!isEmpty(board.website) && (
                                    <div className={styles.contact}>
                                        <div className={styles.icon}>
                                            <IoGlobeOutline />
                                        </div>
                                        <div className={styles.text}>
                                            <Link href={reformatWebsiteLink(board.website)}>
                                                <a rel="noopener noreferrer" target="_blank">
                                                    {board.website}
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                {!isEmpty(board.email) && (
                                    <div className={styles.contact}>
                                        <div className={styles.icon}>
                                            <IoMailOutline />
                                        </div>
                                        <div className={styles.text}>{board.email}</div>
                                    </div>
                                )}
                                {!isEmpty(board.phone) && (
                                    <div className={styles.contact}>
                                        <div className={styles.icon}>
                                            <IoPhonePortraitOutline />
                                        </div>
                                        <div className={styles.text}>{board.phone}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.footer}>
                        <div className={styles.subscribe}>
                            <SubscribeButton boardId={board._id} size="large" />
                        </div>
                    </div> */}
                </div>
            }
        />
    );
};

export default forwardRef(BoardPopover);
