import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC, useRef } from 'react';

import { IBoard, ICategoryFull } from '@stdio/configs/custom-types';
import { getMediaURL } from '@stdio/core/libs/custom-utils';

import { useMui } from '@stdio/core/mui/global/MUI';
import SubscribeButton from './SubscribeButton';

import styles from './BoardHeader.module.scss';

interface IProps {
    board: IBoard;
}

const BoardHeader: FC<IProps> = ({ board }) => {
    const { m } = useMui();
    const { t } = useTranslation('common');
    // const dispatch = useDispatch();

    const { _id = '', name = '', description = '', categories = [], owner = {}, slug = '' } = board;

    const logoUrl = getMediaURL((board?.logo as string[])[3] ?? '');
    const coverUrl = getMediaURL((board?.cover as string[])[0] ?? '');

    // const auth = useSelector((state: AppState) => state.auth);
    // const { isLoggedIn } = auth;

    // const { board, subscribers } = useSelector((state: AppState) => state.board);
    // if (isEmpty(board)) return null;

    // const me = useSelector((state: AppState) => state.me);

    // const isMyBoard =
    //   isLoggedIn && get(owner, "_id", "") === get(me, "profile._id", "");

    const logoViewerPopupRef = useRef<any>(null);
    const logoUploadEditorRef = useRef<any>(null);
    const coverUploadEditorRef = useRef<any>(null);

    // if (!auth) return null;

    let childrenCategories: ICategoryFull[] = [];

    // if (isMyBoard) {
    //   let treeCategories = categories
    //     .filter((item) => !item.category.parent)
    //     .map((item) => {
    //       return {
    //         ...item,
    //         children: categories.filter(
    //           (item1) => item1.category.parent === item.category._id
    //         ),
    //       };
    //     });

    //   for (const item of treeCategories) {
    //     childrenCategories = concat(childrenCategories, item.children);
    //   }
    // }

    return (
        <>
            <div className={styles.boardHeader}>
                <div
                    className={styles.boardCover}
                    style={{
                        backgroundImage: !!coverUrl ? `url(${coverUrl})` : 'unset',
                    }}
                >
                    <div className={styles.boardCoverMask}></div>
                    {/* {isMyBoard && (
            <div className={styles.buttons}>
              <div className={styles.button}>
                <CreateArticleDrawer
                  boardId={_id}
                  onCreateSuccess={() => {
                    dispatch(
                      articleActions.getArticles(true, {
                        filter: { board: _id },
                        scope: "notSet",
                      })
                    );
                  }}
                  categories={childrenCategories}
                />
              </div>
              <div className={styles.button}>
                <Link href={`/${slug}/cms/board`}>
                  <a role="button">
                    <IoCogOutline />
                  </a>
                </Link>
              </div>
              <BasicMenuContext
                trigger={["hover"]}
                placement="bottomRight"
                items={[
                  {
                    icon: <CameraOutlined />,
                    text: t(L.UpdateCover),
                    onClick: () => {
                      coverUploadEditorRef.current.click();
                    },
                  },
                  {
                    icon: <DeleteOutlined />,
                    text: t(L.DeleteCover),
                    onClick: () => {},
                  },
                ]}
                button={
                  <div className={styles.button}>
                    <PictureOutlined />
                  </div>
                }
              />

              <ImageUploadEditor
                width={(1920 / 4) * 3}
                height={(320 / 4) * 3}
                borderRadius={0}
                ref={coverUploadEditorRef}
                onUpload={async (file: Blob) => {
                  m.loading(true);
                  await BoardAPI.updateBoardCover(_id, file);
                  await dispatch(boardActions.getBoardBySlug(slug));
                  m.loading(false);
                }}
              />
            </div>
          )} */}

                    <div className={styles.boardHeaderWrapper}>
                        <div className={styles.boardHeaderWrapperCenter}>
                            <div className={styles.profile}>
                                <div className={styles.profileWrapper}>
                                    <div className={styles.logo}>
                                        <div
                                            onClick={() => {
                                                const { current } = logoViewerPopupRef;
                                                if (current) current.show();
                                            }}
                                            className={styles.image}
                                        >
                                            <img src={logoUrl} alt={board.name} />
                                        </div>
                                        {/* {isMyBoard && (
                      <div className={styles.buttons}>
                        <BasicMenuContext
                          trigger={["hover"]}
                          placement="bottom"
                          items={[
                            {
                              icon: <IoCameraOutline />,
                              text: t(L.UpdateLogo),
                              onClick: () => {
                                logoUploadEditorRef.current.click();
                              },
                            },
                            {
                              icon: <IoTrashBinOutline />,
                              text: t(L.DeleteLogo),
                              onClick: () => {},
                            },
                          ]}
                          button={
                            <div className={styles.button}>
                              <IoCameraOutline />
                            </div>
                          }
                        />
                      </div>
                    )}

                    <ImageUploadEditor
                      width={384}
                      height={384}
                      borderRadius={0}
                      ref={logoUploadEditorRef}
                      onUpload={async (file: Blob) => {
                        loading(true);
                        await BoardAPI.updateBoardLogo(board._id, file);
                        await dispatch(boardActions.getBoardBySlug(board.slug));
                        loading(false);
                      }}
                    /> */}
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.content}>
                                            <h1>
                                                <Link href={`/${slug}`}>
                                                    <a>{name}</a>
                                                </Link>
                                            </h1>
                                            <p>{description}</p>
                                            <p>
                                                <Link href={`/${slug}/subscribers`}>
                                                    <a>
                                                        {/* <b>{subscribers.length}</b> {t(L.Subscribers)} */}
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                        <div className={styles.action}>
                                            <SubscribeButton
                                                size="medium"
                                                boardId={_id}
                                                onChangeSuccess={async () => {
                                                    // await dispatch(boardActions.getSubscribers(_id));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <MediaViewerPopup
        ref={logoViewerPopupRef}
        initSource={{
          src: getMediaURL(get(board, "logo[1]", "")),
          type: "image",
        }}
        maskClosable={true}
        zIndex={9999}
      /> */}
        </>
    );
};

export default BoardHeader;
