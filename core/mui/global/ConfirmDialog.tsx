import { useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export interface IConfirmDialogFuncProps {
    open: (title: string, description: string, yesAction?: VoidFunction, noAction?: VoidFunction) => void;
    close: (reset: boolean) => void;
}

interface IProps {}

const ConfirmDialog: ForwardRefRenderFunction<unknown, IProps> = ({}, ref) => {
    const [visible, setVisible] = useState(false);

    const title = useRef('');
    const description = useRef('');
    const yesAction = useRef(() => {});
    const noAction = useRef(() => {});

    useImperativeHandle(ref, () => ({
        open: (newTitle: string = '', newDescription: string = '', newYesAction: VoidFunction = () => {}, newNoAction: VoidFunction = () => {}) => {
            title.current = newTitle;
            description.current = newDescription;
            yesAction.current = newYesAction;
            noAction.current = newNoAction;
            setVisible(true);
        },
        close: (reset = true) => {
            if (reset) {
                title.current = '';
                description.current = '';
                yesAction.current = () => {};
                noAction.current = () => {};
            }
            setVisible(false);
        },
    }));

    return (
        <Dialog
            open={visible}
            onClose={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disableScrollLock={true}
        >
            <DialogTitle id="alert-dialog-title">{title.current}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description.current}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        noAction.current();
                        setVisible(false);
                    }}
                >
                    Đóng
                </Button>
                <Button
                    onClick={() => {
                        yesAction.current();
                        setVisible(false);
                    }}
                    autoFocus
                >
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default forwardRef(ConfirmDialog);
