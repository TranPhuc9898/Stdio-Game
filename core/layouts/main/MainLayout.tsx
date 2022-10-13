import { FC, ReactNode } from 'react';

import MainFooter from '../../components/custom/MainFooter';
import MainHeader from '../../components/custom/MainHeader';

import styles from './MainLayout.module.scss';

interface IProps {
    children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
    return (
        <div className={styles.mainLayout}>
            <MainHeader />
            <div className={styles.contentLayout}>{children}</div>
            <MainFooter />
        </div>
    );
};

export default MainLayout;
