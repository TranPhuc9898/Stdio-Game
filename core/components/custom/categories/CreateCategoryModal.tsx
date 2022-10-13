import { FC, useState } from 'react';

import { ICategory, INewCategory } from '@stdio/configs/custom-types';
import { CategoryAPI } from '@stdio/core/apis/CategoryAPI';
import { useMui } from '@stdio/core/mui/global/MUI';

interface IProps {
    categories: ICategory[];
    boardId: string;
    onSuccess: VoidFunction;
}

const CreateCategoryModal: FC<IProps> = ({ categories, boardId, onSuccess }) => {
    const { m } = useMui();

    const [visible, setVisible] = useState(false);
    const [category, setCategory] = useState<INewCategory>({
        name: '',
        parent: null,
    });

    const onOk = () => {
        m.loading(true);
        CategoryAPI.createCategory(boardId, category)
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

    return (
        <>
            <button onClick={() => setVisible(true)}>Tạo Category</button>
            {/* <Modal
                wrapClassName={styles.modal}
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
                onOk={onOk}
            >
                <h3>Tạo Category</h3>

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
                    onChange={(value: any) =>
                        setCategory({
                            ...category,
                            parent: value,
                        })
                    }
                    value={category.parent}
                />
            </Modal> */}
        </>
    );
};

export default CreateCategoryModal;
