import { Dialog } from '@mui/material';
import {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useImperativeHandle,
    useState,
} from 'react';

interface IProps {
    content: ReactNode;
}

const BasicDialog: ForwardRefRenderFunction<unknown, IProps> = ({ content }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true);
        },
        close: () => {
            setVisible(false);
        },
    }));

    return (
        <Dialog
            open={visible}
            onClose={() => {
                setVisible(false);
            }}
        >
            {content}
        </Dialog>
    );
};

export default forwardRef(BasicDialog);
