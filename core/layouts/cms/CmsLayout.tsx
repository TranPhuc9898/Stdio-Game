import React, { ReactNode, FC } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { isEmpty } from 'lodash';
import { Breadcrumbs, Link } from '@material-ui/core';

import CmsHeader from './CmsHeader';
import CmsSider from './CmsSider';

import styles from './CmsLayout.module.scss';

interface IProps {
    breadcrumbProps?: {
        text: string;
        href: string;
    }[];
    children: ReactNode;
}

const CmsLayout: FC<IProps> = ({ breadcrumbProps = [], children }) => {
    //   const { role } = useSelector((state: AppState) => state.auth);
    //   if (!["superadmin", "admin", "editor"].includes(role)) return null;

    const role = 'editor';

    return (
        <div className={styles.cmsLayout}>
            <div className={styles.header}>
                <CmsHeader />
            </div>
            <div className={styles.body}>
                <div className={styles.sider}>
                    <Scrollbars autoHide universal={true}>
                        <CmsSider />
                    </Scrollbars>
                </div>
                <div className={styles.main}>
                    <Scrollbars autoHide universal={true}>
                        <div className={styles.mainCenter}>
                            {!isEmpty(breadcrumbProps) && (
                                <div className={styles.navigation}>
                                    {!!breadcrumbProps && (
                                        <Breadcrumbs aria-label="breadcrumb">
                                            {breadcrumbProps.map((link: any, index: number) => (
                                                <Link color="inherit" href={link.href} key={index}>
                                                    {link.text}
                                                </Link>
                                            ))}
                                        </Breadcrumbs>
                                    )}
                                </div>
                            )}
                            <div className={styles.content}>{children}</div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        </div>
    );
};

export default CmsLayout;
