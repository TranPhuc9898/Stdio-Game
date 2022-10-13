import { SITE_NAME } from '@stdio/configs/config';
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react';

import styles from './MediaViewerPopup.module.scss';

type TContent = 'image' | 'video';

interface ISource {
    src: string;
    type: TContent;
    width: number;
    height: number;
}

interface IProps {
    initSource: ISource;
    initVisible?: boolean;
    maskClosable?: boolean;
    zIndex?: number;
    onClickMask?: VoidFunction;
}

const MediaViewerPopup: ForwardRefRenderFunction<unknown, IProps> = (
    {
        initSource = { src: '', type: 'image', width: 1024, height: 1024 },
        initVisible = false,
        maskClosable = false,
        zIndex = 999,
        onClickMask = () => {},
    },
    ref,
) => {
    const [visible, setVisible] = useState(initVisible);
    const [source, setSource] = useState(initSource);

    useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true);
        },
        close: () => {
            setVisible(false);
        },
    }));

    const FORM = (
        <div className={styles.form}>
            {source.type === 'image' && (
                <img src={source.src} alt={SITE_NAME} width={source.width} height={source.height} />
            )}
            {source.type === 'video' && (
                <video controls={true}>
                    <source src={source.src} type="video/mp4"></source>
                </video>
            )}
        </div>
    );

    return (
        <>
            {visible && (
                <div
                    className={styles.popup}
                    style={{ zIndex }}
                    onClick={(e) => {
                        onClickMask();
                        if (maskClosable === true) setVisible(false);
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        {FORM}
                    </div>
                </div>
            )}
        </>
    );
};

export default forwardRef(MediaViewerPopup);
