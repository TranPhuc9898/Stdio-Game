import router from 'next/router';
import {
    forwardRef,
    ForwardRefRenderFunction,
    MouseEvent,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';

import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';

export type TBasicMenuLink = {
    href: string;
    pathnames: string[];
    // scope: 'internal' | 'external';
};

export interface IBasicMenuItem {
    icon?: ReactNode;
    text?: string;
    action?: TBasicMenuLink | VoidFunction; // href | function
    children?: IBasicMenuItem[];
}

interface IProps {
    defaultItems: IBasicMenuItem[];
}

const BasicMenu: ForwardRefRenderFunction<unknown, IProps> = ({ defaultItems = [] }, ref) => {
    useImperativeHandle(ref, () => ({
        open: (e: MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
        },
        close: () => {
            setAnchorEl(null);
        },
        update: (newItems: IBasicMenuItem[]) => {
            setItems(newItems);
            return ref;
        },
    }));

    const [items, setItems] = useState<IBasicMenuItem[]>(defaultItems);

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
        <Menu
            elevation={0}
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            disableScrollLock={true}
        >
            {items.map((item, i) => (
                <MenuItem
                    key={i}
                    onClick={() => {
                        if (!!item.action) {
                            if (typeof item.action === 'function') item.action();
                            else router.replace(item.action.href);
                        }
                    }}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>

                    <Typography variant="inherit">{item.text}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
};

export default forwardRef(BasicMenu);
