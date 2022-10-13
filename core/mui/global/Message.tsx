import { useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

export type TMessageFuncProp = (severity: AlertColor, text: string) => void;

interface IProps {}

const Message: ForwardRefRenderFunction<unknown, IProps> = ({}, ref) => {
    const [visible, setVisible] = useState(false);

    const severity = useRef<AlertColor>('info');
    const [text, setText] = useState('');

    useImperativeHandle(ref, () => ({
        message: (newSeverity: AlertColor = 'info', newText: string = '') => {
            if (severity.current) severity.current = newSeverity;
            setText(newText);
            setVisible(true);
        },
    }));

    return (
        <Snackbar
            open={visible}
            autoHideDuration={6000}
            onClose={() => {
                setVisible(false);
                setText('');
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={() => {
                    setVisible(false);
                }}
                severity={severity.current}
            >
                {text}
            </Alert>
        </Snackbar>
    );
};

export default forwardRef(Message);
