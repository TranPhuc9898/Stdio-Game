import { FC } from 'react';

interface IProps {
    style?: {};
    value: string;
    isParent: boolean;
    onChange: (value: string) => void;
    categoriesRef?: any;
}

const CategorySelect: FC<IProps> = ({ value, style, isParent, onChange, categoriesRef }) => {
    // const dispatch = useDispatch();
    // const { categories } = useSelector((state: AppState) => state.category);

    // const list = isParent ? categories.filter((category) => category.parent === null) : categories.filter((category) => category.parent !== null);

    return (
        <></>
        // <select
        //     value={!find(list, (c) => isEqual(c._id, value)) ? '' : value}
        //     style={{ width: 200, ...style }}
        //     onChange={onChange}
        //     ref={categoriesRef}
        // >
        //     {list.map(({ _id, name }) => (
        //         <option value={_id} key={_id}>
        //             {name}
        //         </option>
        //     ))}
        // </select>
    );
};

export default CategorySelect;
