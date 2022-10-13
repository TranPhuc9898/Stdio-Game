import { Drawer } from '@mui/material';
import {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useImperativeHandle,
    useState,
} from 'react';
import { IoClose } from 'react-icons/io5';

import styles from './BasicDrawer.module.scss';

export type TAnchor = 'left' | 'top' | 'right' | 'bottom';

interface IProps {
    title?: string;
    content: ReactNode;
    anchor?: TAnchor;
    width?: number | string;
    height?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    useCloseButton?: boolean;
}

const BasicDrawer: ForwardRefRenderFunction<unknown, IProps> = (
    {
        title,
        content,
        anchor = 'left',
        width = '100%',
        height = '100%',
        maxWidth = '100%',
        maxHeight = '100%',
        useCloseButton = false,
    },
    ref,
) => {
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
        <Drawer
            anchor={anchor}
            open={visible}
            onClose={() => {
                setVisible(false);
            }}
            disableScrollLock={true}
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width,
                    height,
                    maxWidth,
                    maxHeight,
                },
            }}
        >
            {(!!title || useCloseButton) && (
                <div className={styles.header}>
                    {!!title && <h3>{title}</h3>}
                    {useCloseButton && (
                        <div
                            className={styles.close}
                            onClick={() => {
                                setVisible(false);
                            }}
                        >
                            <IoClose />
                        </div>
                    )}
                </div>
            )}
            <div style={{ padding: 15, height: '100%' }}>{content}</div>
        </Drawer>
    );
};

export default forwardRef(BasicDrawer);
