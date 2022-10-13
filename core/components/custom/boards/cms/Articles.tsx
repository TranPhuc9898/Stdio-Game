import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { IBoard } from '@stdio/configs/custom-types';

import styles from './Articles.module.scss';

interface IProps {
    board: IBoard;
}

const Articles: FC<IProps> = ({ board: { _id, slug: boardSlug } }) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const dispatch = useDispatch();

    // const { articles } = useSelector((state: AppState) => state.article);
    // if (isEmpty(articles)) return null;

    const getArticles = async () => {
        // await dispatch(
        //     articleActions.getArticles(true, {
        //         filter: { board: _id },
        //         scope: 'notSet',
        //     }),
        // );
    };

    useEffect(() => {
        getArticles();
    }, [_id]);

    const columns = [
        {
            align: 'left',
            title: 'ID',
            dataIndex: '_id',
        },
        {
            align: 'left',
            title: 'Tiêu đề',
            render: (record: any) => (
                <a
                    target="__blank"
                    href={`/${record?.board.slug ?? 'article'}/${record.slug}-${record.internalId}`}
                >
                    {record.title}
                </a>
            ),
        },
        // {
        //     align: 'left',
        //     title: 'Đã Xoá',
        //     dataIndex: 'isDeleted',
        //     render: (isDeleted: boolean) => (isDeleted ? <CheckOutlined /> : <></>),
        // },
        // {
        //     align: 'center',
        //     title: '',
        //     render: (record: any) => (
        //         <div className={styles.buttonContainer}>
        //             {!record.isDeleted && (
        //                 <>
        //                     <Button className={styles.button}>
        //                         <a target="__blank" href={`/article/edit/${record.slug}-${record.internalId}`}>
        //                             SỬA
        //                         </a>
        //                     </Button>
        //                     <Button
        //                         className={styles.button}
        //                         type="default"
        //                         onClick={() => {
        //                             Utils.loading(true);
        //                             ArticleAPI.deleteArticle(record._id)
        //                                 .then(() => {
        //                                     getArticles();
        //                                 })
        //                                 .catch(() => {})
        //                                 .finally(() => Utils.loading(false));
        //                         }}
        //                         disabled={record.isDeleted}
        //                     >
        //                         XOÁ
        //                     </Button>
        //                 </>
        //             )}
        //         </div>
        //     ),
        // },
    ];

    return (
        <div className={styles.articles}>
            {/* <Table size="middle" columns={columns as any} dataSource={articles} rowKey="_id" bordered={false} loading={false} pagination={false} /> */}
        </div>
    );
};

export default Articles;
