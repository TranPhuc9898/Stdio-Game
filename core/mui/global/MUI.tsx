import { createContext, useContext } from 'react';
import { useRef } from 'react';
import { AlertColor } from '@mui/material';

import ConfirmDialog, { IConfirmDialogFuncProps } from './ConfirmDialog';
import Loading, { TLoadingFuncProp } from './Loading';
import Message, { TMessageFuncProp } from './Message';

interface IMUIProps {
    message: TMessageFuncProp;
    confirmDialog: IConfirmDialogFuncProps;
    loading: TLoadingFuncProp;
}

let m: IMUIProps = {
    message: (severity = 'info', text = '') => {},
    confirmDialog: { open: () => {}, close: () => {} },
    loading: (enable = false) => {},
};

export const MuiContext = createContext<IMUIProps>(m);

export const useMui = () => {
    return { m: useContext(MuiContext) };
};

export const withMUI = (WrappedComponent: any) => {
    interface IProps {}

    const Component = (props: IProps) => {
        const messageRef = useRef<any>(null);
        const confirmDialogRef = useRef<any>(null);
        const loadingRef = useRef<any>(null);

        const contextValues: IMUIProps = {
            message: (newSeverity: AlertColor = 'info', newText: string = '') => {
                if (messageRef.current) {
                    messageRef.current.message(newSeverity, newText);
                }
            },
            loading: (enabled: boolean = false) => {
                if (loadingRef.current) {
                    loadingRef.current.enable(enabled);
                }
            },
            confirmDialog: {
                open: (
                    newTitle: string = '',
                    newDescription: string = '',
                    newYesAction: VoidFunction = () => {},
                    newNoAction: VoidFunction = () => {},
                ) => {
                    if (confirmDialogRef.current) {
                        confirmDialogRef.current.open(
                            newTitle,
                            newDescription,
                            newYesAction,
                            newNoAction,
                        );
                    }
                },
                close: (reset: boolean = true) => {
                    if (confirmDialogRef.current) {
                        confirmDialogRef.current.close(reset);
                    }
                },
            },
        };

        return (
            <MuiContext.Provider value={contextValues}>
                <Message ref={messageRef} />
                <ConfirmDialog ref={confirmDialogRef} />
                <Loading ref={loadingRef} />
                <WrappedComponent {...props} />
            </MuiContext.Provider>
        );
    };

    Component.getInitialProps = async (context: any) => {
        let pageProps = {};

        pageProps = {
            ...pageProps,
            ...(context?.Component.getInitialProps ??
                (undefined && (await context.Component.getInitialProps(context.ctx)))),
            ...(WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(context))),
        };

        return {
            pageProps,
        };
    };

    return Component;
};
