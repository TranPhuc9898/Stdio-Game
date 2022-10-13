import { Popover } from '@mui/material';
import {
    forwardRef,
    ForwardRefRenderFunction,
    MouseEvent,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';

type TVertical = number | 'top' | 'bottom' | 'center';
type THorizontal = number | 'center' | 'left' | 'right';

interface IProps {
    content: ReactNode;
    anchorOrigin?: { vertical: TVertical; horizontal: THorizontal };
    transformOrigin?: { vertical: TVertical; horizontal: THorizontal };
}

const BasicPopover: ForwardRefRenderFunction<unknown, IProps> = (
    {
        content = <></>,
        anchorOrigin = {
            vertical: 'bottom',
            horizontal: 'center',
        },
        transformOrigin = {
            vertical: 'top',
            horizontal: 'center',
        },
    },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        open: (e: MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
        },
        close: () => {
            setAnchorEl(null);
        },
    }));

    useEffect(() => {
        const hide = () => {
            setAnchorEl(null);
        };

        window.addEventListener('scroll', hide);
        window.addEventListener('resize', hide);

        return () => {
            window.removeEventListener('scroll', hide);
            window.removeEventListener('resize', hide);
        };
    }, []);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Popover
            sx={{}}
            elevation={0}
            keepMounted={true}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            disableScrollLock={true}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            children={content}
        />
    );
};

export default forwardRef(BasicPopover);
