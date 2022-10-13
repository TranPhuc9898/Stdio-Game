import React, { FC, useEffect, useRef, useState } from 'react';
import { BsPen, BsTrash, BsFileEarmarkPlus } from 'react-icons/bs';

import { ITopic } from '@stdio/configs/custom-types';
import { TopicAPI } from '@stdio/core/apis/TopicAPI';
import { useMui } from '@stdio/core/mui/global/MUI';

import styles from './CmsTopicsLayout.module.scss';

interface IActiveTopic {
    topic: {
        index: number;
        data: ITopic;
    } | null;
    subTopic: {
        index: number;
        data: ITopic;
    } | null;
}

interface IProps {
    topics: ITopic[];
}

const CmsTopicsLayout: FC<IProps> = ({ topics: initialCategories = [] }) => {
    const { m } = useMui();

    const [topics, setTopics] = useState(initialCategories);

    const updateTopicDrawerRef = useRef<any>(null);

    const activeTopic = useRef<IActiveTopic>({
        topic: null,
        subTopic: null,
    });

    useEffect(() => {
        // TopicAPI.getTopics({ tree: true })
        //   .then((resp) => {
        //     setTopics(resp.data);
        //   })
        //   .catch((err) => {});
    }, []);

    const createTopic = async (topic: ITopic | null) => {
        m.loading(true);

        TopicAPI.createTopic({
            name: topic === null ? 'Nhóm chủ đề mới' : 'Chủ đề mới',
            order: 0,
            //   parent: topic === null ? null : topic._id,
        })
            .then((resp) => {
                // if (!topic) {
                //   resp.data = {
                //     ...resp.data,
                //     children: [],
                //   };
                // }
                // let newTopics = [...topics];
                // if (resp.data.parent) {
                //   const parentIndex = topics.findIndex(
                //     (value) => value._id === resp.data.parent
                //   );
                //   newTopics[parentIndex].children.push(resp.data);
                // } else {
                //   newTopics.push(resp.data);
                // }
                // setTopics(newTopics);
                // m.message("success", "Tạo chủ đề mới thành công.");
            })
            .catch((err) => {
                m.message('error', 'Tạo chủ đề mới thất bại.');
            })
            .finally(() => {
                m.loading(false);
            });
    };

    const deleteTopic = async (
        topic: ITopic,
        index: number,
        subTopic: ITopic | null,
        subIndex: number,
    ) => {
        if (topic === null) return;

        if (subTopic === null) {
            // if (!isEmpty(topic.children)) {
            //     m.message('error', 'Xoá danh mục con trước.');
            //     return;
            // }
            // m.loading(true);
            // TopicAPI.deleteTopic(topic._id)
            //   .then((resp) => {
            //     const updatedTopics = [...topics];
            //     updatedTopics.splice(index, 1);
            //     setTopics(updatedTopics);
            //   })
            //   .catch((err) => {})
            //   .finally(() => {
            //     m.loading(false);
            //   });
        } else {
            // m.loading(true);
            // TopicAPI.deleteTopic(get(subTopic, "_id", ""))
            //   .then((resp) => {
            //     const updatedTopics = [...topics];
            //     updatedTopics[index].children.splice(subIndex, 1);
            //     setTopics(updatedTopics);
            //   })
            //   .catch((err) => {
            //     m.message("error", "Không thể xoá danh mục. Thử lại sau.");
            //   })
            //   .finally(() => {
            //     m.loading(false);
            //   });
        }
    };

    return (
        <>
            <div className={styles.cmsCategoriesLayout}>
                <div className={styles.cmsCategoriesLayoutCenter}>
                    <h2>
                        <div className={styles.title}></div>
                        <div className={styles.buttons}>
                            <div
                                className={styles.button}
                                onClick={() => {
                                    m.confirmDialog.open(
                                        'Tạo nhóm chủ đề',
                                        'Bạn muốn tạo nhóm chủ đề mới?',
                                        () => {
                                            createTopic(null);
                                        },
                                        () => {},
                                    );
                                }}
                            >
                                Tạo nhóm chủ đề
                            </div>
                        </div>
                    </h2>
                    <ul>
                        {topics.map((topic, i) => (
                            <li key={i}>
                                <h3>
                                    <div className={styles.title}>{topic.name}</div>
                                    <div className={styles.buttons}>
                                        <a
                                            role="button"
                                            onClick={() => {
                                                m.confirmDialog.open(
                                                    'Xóa nhóm chủ đề',
                                                    'Bạn muốn xóa nhóm chủ đề?',
                                                    () => {
                                                        deleteTopic(topic, i, null, -1);
                                                    },
                                                    () => {},
                                                );
                                            }}
                                        >
                                            <BsTrash size={18} />
                                        </a>{' '}
                                        <a
                                            role="button"
                                            onClick={() => {
                                                if (updateTopicDrawerRef.current) {
                                                    updateTopicDrawerRef.current
                                                        .change(topic, i, 'topic')
                                                        .current.open();
                                                }
                                            }}
                                        >
                                            <BsPen size={18} />
                                        </a>{' '}
                                        <a
                                            role="button"
                                            onClick={() => {
                                                m.confirmDialog.open(
                                                    'Tạo chủ đề',
                                                    'Bạn muốn tạo chủ đề mới?',
                                                    () => {
                                                        createTopic(topic);
                                                    },
                                                    () => {},
                                                );
                                            }}
                                        >
                                            <BsFileEarmarkPlus size={18} />
                                        </a>
                                    </div>
                                </h3>
                                <table>
                                    <tbody>
                                        {/* {topic?.children ?? [].map((subTopic, jndex) => (
                                            <tr key={jndex}>
                                                <td>{subTopic.name}</td>
                                                <td width="60">
                                                    <a
                                                        role="button"
                                                        onClick={() => {
                                                            m.confirmDialog.open(
                                                                'Xóa chủ đề',
                                                                'Bạn muốn xóa chủ đề?',
                                                                () => {
                                                                    deleteTopic(topic, index, subTopic, jndex);
                                                                },
                                                                () => {},
                                                            );
                                                        }}
                                                    >
                                                        <BsTrash size={18} />
                                                    </a>{' '}
                                                    <a
                                                        role="button"
                                                        onClick={() => {
                                                            if (updateTopicDrawerRef.current) {
                                                                updateTopicDrawerRef.current.change(subTopic, jndex, 'subTopic').current.open();
                                                            }
                                                        }}
                                                    >
                                                        <BsPen size={18} />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))} */}
                                    </tbody>
                                </table>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* <UpdateTopicDrawer
        ref={updateTopicDrawerRef}
        onUpdateTopic={(newTopic, newIndex, newTopics) => {
          setTopics(newTopics);
          setActiveTopic({
            ...activeTopic,
            ...((newTopic as IParentTopic).children && {
              topic: {
                ...activeTopic.topic,
                data: newTopic,
                index: newIndex,
              },
            }),
            ...(!(newTopic as IParentTopic).children && {
              subTopic: {
                ...activeTopic.subTopic,
                data: newTopic,
                index: newIndex,
              },
            }),
          });
        }}
        topics={topics}
      /> */}
        </>
    );
};

export default CmsTopicsLayout;
