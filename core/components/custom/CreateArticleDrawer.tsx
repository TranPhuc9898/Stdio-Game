import classnames from 'classnames';
import {
    forwardRef,
    ForwardRefRenderFunction,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { ICategory, ITopic } from '@stdio/configs/custom-types';
import { useMui } from '@stdio/core/mui/global/MUI';
import { L } from '@stdio/public/locales/langs';

import BasicDrawer from '@stdio/core/mui/wrappers/BasicDrawer';
import basicDrawerStyles from '@stdio/core/mui/wrappers/BasicDrawer.module.scss';

interface IProps {
    type: 'individual' | 'board' | 'editor';
    boardId?: string;
}

const CreateArticleDrawer: ForwardRefRenderFunction<unknown, IProps> = ({ type, boardId }, ref) => {
    const { t } = useTranslation('common');
    const { m } = useMui();
    // const dispatch = useDispatch();

    const basicDrawerRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            if (basicDrawerRef.current) basicDrawerRef.current.open();
        },
        close: () => {
            if (basicDrawerRef.current) basicDrawerRef.current.close();
        },
    }));

    const [title, setTitle] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [topics, setTopics] = useState<ITopic[]>([]);

    const initialArticle = {
        board: boardId,
        title,
        topics: selectedTopics,
        ...(!!categories && { categories: selectedCategories }),
        adsConfig: {
            internalAds: true,
            externalAds: true,
        },
    };

    useEffect(() => {
        // dispatch(topicActions.getTopics());
    }, []);

    const onOk = async () => {
        // if ((!!categories && category.length == 0) || isEmpty(topic)) {
        //   m.message("info", "Vui lòng chọn category/topic");
        // } else {
        //   try {
        //     await dispatch(articleActions.createArticle(initialArticle));
        //     onCreateSuccess && onCreateSuccess();
        //     setVisible(false);
        //   } catch (err) {
        //     console.log(err);
        //   }
        // }
    };

    // const options = !!categories
    //   ? categories.map((c) => ({
    //       value: c.category._id,
    //       label: c.category.name,
    //     }))
    //   : [];

    return (
        <BasicDrawer
            title={t(L.CreateNewArticle)}
            useCloseButton={true}
            anchor="left"
            ref={basicDrawerRef}
            content={
                <div className={classnames(basicDrawerStyles.basicDrawer, basicDrawerStyles.md)}>
                    <div className={basicDrawerStyles.section}>
                        <div className={basicDrawerStyles.field}>
                            <h3>
                                <>{t(L.Title)}</>
                            </h3>
                            <input type="text" />
                        </div>
                        <div
                            className={classnames(
                                basicDrawerStyles.field,
                                basicDrawerStyles.twoCol,
                            )}
                        >
                            <div>
                                <h3>
                                    <>{t(L.GroupTopic)}</>
                                </h3>
                                <select>
                                    <option>X</option>
                                </select>
                            </div>
                            <div>
                                <h3>
                                    <>{t(L.Topic)}</>
                                </h3>
                                <select>
                                    <option>X</option>
                                </select>
                            </div>
                        </div>
                        {type == 'board' && (
                            <div
                                className={classnames(
                                    basicDrawerStyles.field,
                                    basicDrawerStyles.twoCol,
                                )}
                            >
                                <div>
                                    <h3>
                                        <>{t(L.GroupCategory)}</>
                                    </h3>
                                    <select>
                                        <option>X</option>
                                    </select>
                                </div>
                                <div>
                                    <h3>
                                        <>{t(L.Category)}</>
                                    </h3>
                                    <select>
                                        <option>X</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {type == 'editor' && (
                            <div className={basicDrawerStyles.field}>
                                <h3>
                                    <>{t(L.Boards)}</>
                                </h3>
                                <select>
                                    <option>---</option>
                                </select>
                            </div>
                        )}
                        <div className={basicDrawerStyles.field}>
                            <div className={basicDrawerStyles.button}>
                                <>{t(L.CreateNewArticle)}</>
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default forwardRef(CreateArticleDrawer);

// <Drawer
//       title="Bài viết mới của bạn"
//       visible={visible}
//       onCancel={() => {
//         setVisible(false);
//       }}
//       onOk={onOk}
//     >
//       <div className={styles.createArticleModal}>
//         <h4>Tiêu đề</h4>
//         <Input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ fontSize: "1rem" }}
//         />
//         <h4>Topic</h4>
//         <TopicSelect onChange={(value: any) => setTopic(value)} value={topic} />
//         {!!categories && (
//           <>
//             <h4>Category</h4>
//             <Select
//               style={{ width: 150 }}
//               options={options}
//               onChange={(value) => setCategory([value])}
//             />
//           </>
//         )}
//       </div>
//     </Drawer>
