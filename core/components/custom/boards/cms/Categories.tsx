import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { IBoard, ICategory } from '@stdio/configs/custom-types';

import styles from './Categories.module.scss';

interface IProps {
    board: IBoard;
}

// const CategoriesTable: FC<{ data: any; columns: any }> = ({ data, columns }) => {
//     return <Table size="middle" columns={columns} dataSource={data} rowKey="_id" bordered={false} loading={false} pagination={false} />;
// };

const Categories: FC<IProps> = ({ board: { _id: boardId } }) => {
    const { t } = useTranslation('common');

    // const { categories } = useSelector((state: AppState) => state.category);

    const dispatch = useDispatch();

    const getData = async () => {
        // await dispatch(categoryActions.getCategories(boardId));
    };

    useEffect(() => {
        getData();
    }, [boardId]);

    // let categoriesTree = categories.filter((c) => !c.parent);
    // categoriesTree = categoriesTree.map((c, i) => {
    //     const children = [];
    //     for (const category of categories) if (get(category, 'parent._id') === c._id) children.push(category);

    //     return _.isEmpty(children) ? c : { ...c, children };
    // });

    const columns = [
        {
            align: 'left',
            title: 'ID',
            key: '_id',
            dataIndex: '_id',
        },
        {
            align: 'left',
            title: 'Tên',
            key: 'name',
            dataIndex: 'name',
        },
        {
            align: 'left',
            title: 'Slug',
            key: 'slug',
            dataIndex: 'slug',
        },
        {
            align: 'left',
            title: 'Danh mục cha',
            key: 'parent',
            dataIndex: 'parent',
            render: (parent: ICategory) => <span>{parent?.name ?? ''}</span>,
        },
        {
            align: 'left',
            title: 'Số bài viết',
            key: 'count',
            dataIndex: 'count',
        },
        {
            align: 'center',
            title: '',
            key: 'action',
            render: (record: any) => (
                <div className={styles.buttonContainer}>
                    {!record.isDeleted && (
                        <>
                            {/* <EditCategoryModal category={record} boardId={boardId} onSuccess={getData} /> */}
                            {/* <Button
                                className={styles.button}
                                type="default"
                                onClick={() => {}}
                                disabled={record.count > 0}
                            >
                                {t(LANG.Delete)}
                            </Button> */}
                        </>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className={styles.categories}>
            {/* <p>
                <CreateCategoryModal categories={categories} boardId={boardId} onSuccess={getData} />
            </p>
            <CategoriesTable data={categoriesTree} columns={columns} /> */}
        </div>
    );
};

export default Categories;
