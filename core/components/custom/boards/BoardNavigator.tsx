import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { getMediaURL } from '@stdio/core/libs/custom-utils';
import { reformatWebsiteLink } from '@stdio/core/libs/utils';

import { IBoard } from '@stdio/configs/custom-types';

import { L } from '@stdio/public/locales/langs';

import styles from './BoardNavigator.module.scss';

type TPage = 'board' | 'cms' | 'subscribers';

interface IProps {
    board: IBoard;
}

const BoardNavigator: FC<IProps> = ({ board }) => {
    //   const auth = useSelector((state: AppState) => state.auth);
    //   if (!auth) return null;
    //   if (isEmpty(board)) return null;

    const { t } = useTranslation('common');
    const route = useRouter();

    const boardContactPopupRef = useRef<any>(null);

    const logoUrl = getMediaURL((board?.logo as string[])[5] ?? '');

    const a = {
        board: [
            {
                href: `/${board.slug}/articles`,
                content: t(L.Articles),
            },
            {
                href: `/${board.slug}/about`,
                content: t(L.About),
            },
        ],
        cms: [
            {
                href: `/${board.slug}`,
                content: <IoIosArrowBack />,
            },
            {
                href: `/${board.slug}/cms/articles`,
                content: t(L.Articles),
            },
            {
                href: `/${board.slug}/cms/categories`,
                content: t(L.Categories),
            },
            {
                href: `/${board.slug}/cms/home`,
                content: t(L.Home),
            },
            {
                href: `/${board.slug}/cms/board`,
                content: t(L.Information),
            },
        ],
        subscribers: [
            {
                href: `/${board.slug}`,
                content: <IoIosArrowBack />,
            },
            {
                href: `/${board.slug}/subscribers`,
                content: t(L.Subscribers),
            },
        ],
    };

    let pageType: TPage = 'board';

    if (route.pathname === '/[boardSlug]/cms/[cmsType]') pageType = 'cms';
    else if (route.pathname === '/[boardSlug]/subscribers') pageType = 'subscribers';

    const website = reformatWebsiteLink(board?.website ?? '');
    const phone = board?.phone ?? '';

    return (
        <>
            <div className={styles.boardNavigator}>
                <div className={styles.boardNavigatorCenter}>
                    <div className={styles.leftCol}>
                        {pageType !== 'cms' && pageType !== 'subscribers' && (
                            <div className={styles.logo}>
                                <Link href={`/${board.slug}`}>
                                    <a>
                                        {/* <BoardPopover board={board}> */}
                                        <img
                                            src={logoUrl}
                                            alt={board.name}
                                            width={40}
                                            height={40}
                                        />
                                        {/* </BoardPopover> */}
                                    </a>
                                </Link>
                            </div>
                        )}
                        <ul className={styles.navigation}>
                            {(a[pageType] as any).map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} as={link.as}>
                                        <a
                                            className={classnames({
                                                [styles.active]: route.asPath === link.as,
                                            })}
                                        >
                                            {link.content}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {pageType !== 'cms' && pageType !== 'subscribers' && (
                            <div
                                className={styles.button}
                                // onClick={() => {
                                //   if (boardContactPopupRef.current)
                                //     boardContactPopupRef.current.show();
                                // }}
                            >
                                <>{t(L.Contact)}</>
                            </div>
                        )}
                    </div>
                    <div className={styles.rightCol}></div>
                </div>
            </div>
            {/* {pageType !== "cms" && pageType !== "subscribers" && (
        <BoardContactPopup
          ref={boardContactPopupRef}
          initialBoard={board}
          maskClosable={true}
        />
      )} */}
        </>
    );
};

export default BoardNavigator;
