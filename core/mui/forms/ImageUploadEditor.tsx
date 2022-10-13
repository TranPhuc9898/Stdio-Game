import { Dialog, Slider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';
import {
    ChangeEvent,
    forwardRef,
    ForwardRefRenderFunction,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import AvatarEditor from 'react-avatar-editor';
import { BiImage, BiZoomIn, BiZoomOut } from 'react-icons/bi';

import { dataURLtoBlob } from '@stdio/core/libs/utils';
import { useMui } from '../global/MUI';

import styles from './ImageUploadEditor.module.scss';

const OUTER_BOX = {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0,
};

const DIALOG = {
    scaleBar: 40,
    actionBar: 60,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
};

const useStyles = makeStyles({
    dialogPaper: {
        minWidth: 300,
        minHeight: 300,
        maxWidth: '100% !important',
        maxHeight: '100vh',
        margin: OUTER_BOX.paddingHorizontal,
    },
});

interface IProps {
    onUpload?: (file: Blob) => void;
    cropWidth?: number;
    cropHeight?: number;
    borderRadius?: number;
}

const ImageUploadEditor: ForwardRefRenderFunction<unknown, IProps> = (
    { onUpload, cropWidth = 512, cropHeight = 512, borderRadius = 0 },
    ref,
) => {
    const { m } = useMui();

    const inputRef = useRef<any>(null);
    const editorRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            if (inputRef.current) inputRef.current.click();
        },
    }));

    const classes = useStyles();
    const [visibleImageEditor, setVisibleImageEditor] = useState(false);

    const [sliderValue, setSliderValue] = useState(1);
    const [localUrl, setLocalUrl] = useState('');

    const [modalSize, setModalSize] = useState({
        w: cropWidth,
        h: cropHeight,
    });

    const [canvasSize, setCanvasSize] = useState({
        w: cropWidth,
        h: cropHeight,
    });

    useEffect(() => {
        const updateCanvasSize = () => {
            const { clientWidth, clientHeight } = document.documentElement;

            const documentSizeWithoutPadding = {
                w: clientWidth - 2 * OUTER_BOX.paddingHorizontal,
                h: clientHeight - 2 * OUTER_BOX.paddingVertical,
            };

            const absoluteCanvasSize = {
                w: cropWidth,
                h: cropHeight,
            };

            const absoluteDialogSize = {
                w: absoluteCanvasSize.w + 2 * DIALOG.paddingHorizontal + 2 * DIALOG.borderWidth,
                h:
                    absoluteCanvasSize.h +
                    2 * DIALOG.paddingVertical +
                    2 * DIALOG.borderWidth +
                    DIALOG.scaleBar +
                    DIALOG.actionBar,
            };

            let relativeCanvasSize = {
                w: cropWidth,
                h: cropHeight,
            };

            if (
                absoluteDialogSize.w > documentSizeWithoutPadding.w ||
                absoluteDialogSize.h > documentSizeWithoutPadding.h
            ) {
                const documentSizeWithoutPaddingAndCanvasPadding = {
                    w:
                        documentSizeWithoutPadding.w -
                        2 * DIALOG.paddingHorizontal -
                        2 * DIALOG.borderWidth,
                    h:
                        documentSizeWithoutPadding.h -
                        2 * DIALOG.paddingVertical -
                        2 * DIALOG.borderWidth -
                        DIALOG.scaleBar -
                        DIALOG.actionBar,
                };

                const ratio = Math.min(
                    documentSizeWithoutPaddingAndCanvasPadding.w / absoluteCanvasSize.w,
                    documentSizeWithoutPaddingAndCanvasPadding.h / absoluteCanvasSize.h,
                );

                relativeCanvasSize = {
                    w: absoluteCanvasSize.w * ratio,
                    h: absoluteCanvasSize.h * ratio,
                };
            }

            let relativeDialogSize = {
                w: relativeCanvasSize.w + 2 * DIALOG.paddingHorizontal + 2 * DIALOG.borderWidth,
                h:
                    relativeCanvasSize.h +
                    2 * DIALOG.paddingVertical +
                    2 * DIALOG.borderWidth +
                    DIALOG.scaleBar +
                    DIALOG.actionBar,
            };

            setCanvasSize(relativeCanvasSize);
            setModalSize(relativeDialogSize);
        };

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/png,image/jpeg');

        input.addEventListener('change', (e) =>
            localUploadImage(e as unknown as ChangeEvent<HTMLInputElement>),
        );

        inputRef.current = input;

        updateCanvasSize();
        window.addEventListener('load', updateCanvasSize);
        window.addEventListener('resize', updateCanvasSize);

        return () => {
            input.removeEventListener('change', (e) =>
                localUploadImage(e as unknown as ChangeEvent<HTMLInputElement>),
            );

            window.removeEventListener('load', updateCanvasSize);
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, []);

    const localUploadValidate = (file: File) => {
        if (!!!file) return;

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt4M = file.size / 1024 / 1024 < 4;

        let messages = [];

        if (!isJpgOrPng) messages.push('Chỉ hỗ trợ ảnh PNG và JPG');
        if (!isLt4M) messages.push('Hỗ trợ ảnh không quá 4MB');

        if (messages.length > 0) m.message('error', messages.join(' '));

        return isJpgOrPng && isLt4M;
    };

    const localUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (!!!file) return;

        if (localUploadValidate(file as File) === false) return;
        setLocalUrl(URL.createObjectURL(file));

        setSliderValue(1);
        setVisibleImageEditor(true);
    };

    const serverUploadImage = async () => {
        if (editorRef.current) {
            const dataURL = editorRef.current.getImage().toDataURL();
            const file: Blob = dataURLtoBlob(dataURL, 'image/png');

            !!onUpload && onUpload(file);

            if (inputRef.current) inputRef.current.value = '';
            setVisibleImageEditor(false);
        }
    };

    return (
        <Dialog classes={{ paper: classes.dialogPaper }} open={visibleImageEditor}>
            <div
                className={styles.imageUploadEditor}
                style={{
                    width: modalSize.w,
                    height: modalSize.h,
                }}
            >
                <div
                    className={styles.image}
                    style={{
                        width: canvasSize.w,
                        height: canvasSize.h,
                        paddingTop: DIALOG.paddingVertical,
                        paddingBottom: DIALOG.paddingVertical,
                        paddingLeft: DIALOG.paddingHorizontal,
                        paddingRight: DIALOG.paddingHorizontal,
                    }}
                >
                    <div
                        className={styles.imageBox}
                        style={{
                            borderWidth: DIALOG.borderWidth,
                        }}
                    >
                        <AvatarEditor
                            image={localUrl}
                            width={canvasSize.w}
                            height={canvasSize.h}
                            border={0}
                            color={[0, 0, 0, 0.3]}
                            scale={sliderValue}
                            borderRadius={borderRadius}
                            ref={editorRef}
                        />
                    </div>
                </div>
                <div className={styles.scale}>
                    <div className={styles.icon}>
                        <BiZoomOut />
                    </div>
                    <div className={styles.slider}>
                        <Slider
                            min={1}
                            max={2.5}
                            step={0.01}
                            value={sliderValue}
                            onChange={(e: any, value: number | number[]) => {
                                setSliderValue(value as number);
                            }}
                        />
                    </div>
                    <div className={styles.icon}>
                        <BiZoomIn />
                    </div>
                </div>

                <div className={styles.action}>
                    <div className={styles.title}>
                        <BiImage />
                    </div>
                    <div className={styles.buttons}>
                        <div
                            className={classnames(styles.button, styles.cancel)}
                            onClick={() => {
                                if (inputRef.current) inputRef.current.value = '';
                                setVisibleImageEditor(false);
                            }}
                        >
                            Hủy
                        </div>
                        <div
                            className={classnames(styles.button, styles.repick)}
                            onClick={() => {
                                if (inputRef.current) inputRef.current.click();
                            }}
                        >
                            Chọn lại
                        </div>
                        {!!onUpload && (
                            <div
                                className={styles.button}
                                onClick={() => {
                                    serverUploadImage();
                                }}
                            >
                                Lưu
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default forwardRef(ImageUploadEditor);
