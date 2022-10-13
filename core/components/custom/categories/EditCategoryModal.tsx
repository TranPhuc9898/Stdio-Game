import { FC, useEffect, useState } from 'react';

import { IUpdateCategory } from '@stdio/configs/custom-types';
import { CategoryAPI } from '@stdio/core/apis/CategoryAPI';
import { useMui } from '../../../mui/global/MUI';

interface IProps {
    boardId: string;
    initialCategory: { name: string; parent: string; _id: string };
    onSuccess: VoidFunction;
}

const EditCategoryModal: FC<IProps> = ({ boardId, initialCategory, onSuccess }) => {
    const { m } = useMui();

    const [visible, setVisible] = useState(false);
    const [category, setCategory] = useState<IUpdateCategory>({ name: '', parent: null });

    const onOk = () => {
        m.loading(true);
        CategoryAPI.updateCategory(boardId, initialCategory._id, category)
            .then(() => {
                onSuccess();
            })
            .catch((err) => {
                m.message('error', err?.response.data.message ?? '');
            })
            .finally(() => {
                m.loading(false);
                setVisible(false);
            });
    };

    useEffect(() => {
        const { name, parent } = initialCategory;
        setCategory({ name, parent: parent ?? null });
    }, []);

    return (
        <>
            <button onClick={() => setVisible(true)}>Sửa Category</button>

            {/* <Modal wrapClassName={styles.modal} visible={visible} onCancel={() => {setVisible(false);}} onOk={onOk}>
                <h3>Sửa Category</h3>

                <input
                    value={category.name}
                    onChange={(e) =>
                        setCategory({
                            ...category,
                            name: e.target.value,
                        })
                    }
                    placeholder="Tiêu đề"
                    style={{ fontSize: '1rem' }}
                />

                <h4>Danh mục cha</h4>
                <CategorySelect
                    isParent={true}
                    onChange={(value) =>
                        setCategory({
                            ...category,
                            parent: value,
                        })
                    }
                    value={category?.parent ?? ''}
                />
            </Modal> */}
        </>
    );
};

export default EditCategoryModal;
