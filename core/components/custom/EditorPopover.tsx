import React, {
    forwardRef,
    ForwardRefRenderFunction,
    useRef,
    MouseEvent,
    useImperativeHandle,
} from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { useMui } from '@stdio/core/mui/global/MUI';
import BasicPopover from '@stdio/core/mui/wrappers/BasicPopover';
import { L } from '@stdio/public/locales/langs';

import styles from './EditorPopover.module.scss';

interface IProps {
    id: string;
    type: 'article' | 'app';
}

const EditorPopover: ForwardRefRenderFunction<unknown, IProps> = (
    { id = '', type = 'article' },
    ref,
) => {
    const { m } = useMui();
    const { t } = useTranslation('common');

    const basicPopoverRef = useRef<any>(null);
    const router = useRouter();

    useImperativeHandle(ref, () => ({
        open: (e: MouseEvent<HTMLElement>) => {
            basicPopoverRef?.current?.open?.(e);
        },
        close: () => {
            basicPopoverRef?.current?.close?.();
        },
    }));

    return (
        <BasicPopover
            ref={basicPopoverRef}
            content={
                <div className={styles.editorPopover}>
                    <div className={styles.copy}>
                        <input defaultValue={id} readOnly />
                        <CopyToClipboard text={id}>
                            <div
                                className={styles.button}
                                onClick={() => {
                                    m.message('info', t(L.CopiedLink));
                                }}
                            >
                                <div className={styles.icon}>
                                    <IoCopyOutline />
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>

                    <div className={styles.actions}>
                        <Link
                            href={`/cms/editor/${
                                type === 'article' ? 'articles' : 'apps'
                            }/update?id=${id}`}
                        >
                            <a>Edit</a>
                        </Link>
                    </div>
                </div>
            }
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        />
    );
};

export default forwardRef(EditorPopover);
