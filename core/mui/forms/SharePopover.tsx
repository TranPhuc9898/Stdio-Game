import QRCode from 'qrcode.react';
import {
    forwardRef,
    ForwardRefRenderFunction,
    MouseEvent,
    useImperativeHandle,
    useRef,
} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { IoCopyOutline, IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import { L } from '@stdio/public/locales/langs';
import { useMui } from '../global/MUI';
import BasicPopover from '../wrappers/BasicPopover';

import styles from './SharePopover.module.scss';

interface IProps {
    text: string;
    link: string;
}

const SharePopover: ForwardRefRenderFunction<unknown, IProps> = ({ text = '', link = '' }, ref) => {
    const { m } = useMui();
    const { t } = useTranslation('common');

    const basicPopoverRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        open: (e: MouseEvent<HTMLElement>) => {
            if (basicPopoverRef.current) basicPopoverRef.current.open(e);
        },
        close: () => {
            if (basicPopoverRef.current) basicPopoverRef.current.close();
        },
    }));

    return (
        <BasicPopover
            ref={basicPopoverRef}
            content={
                <div className={styles.sharePopover}>
                    <div className={styles.classic}>
                        <div className={styles.qrCode}>
                            <QRCode
                                size={140}
                                renderAs="svg"
                                imageSettings={{
                                    src: '/static/favicon.ico',
                                    x: undefined,
                                    y: undefined,
                                    height: 16,
                                    width: 16,
                                    excavate: true,
                                }}
                                value={link}
                            />
                        </div>
                        <div className={styles.social}>
                            <FacebookShareButton url={link} title={text}>
                                <IoLogoFacebook />
                            </FacebookShareButton>
                            <TwitterShareButton url={link} title={text}>
                                <IoLogoTwitter />
                            </TwitterShareButton>
                            <LinkedinShareButton url={link} title={text}>
                                <IoLogoLinkedin />
                            </LinkedinShareButton>
                        </div>
                    </div>
                    <div className={styles.copy}>
                        <input defaultValue={link} readOnly />
                        <CopyToClipboard text={link}>
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

export default forwardRef(SharePopover);
