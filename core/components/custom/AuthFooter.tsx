import { useRouter } from 'next/router';
import { FC } from 'react';

import styles from './AuthFooter.module.scss';

interface IProps {}

const AuthFooter: FC<IProps> = () => {
    const { pathname } = useRouter();

    return (
        <div className={styles.authFooter}>
            <div className={styles.authFooterCenter}>
                {/* <ul>
          {pathname !== "/auth/login" && (
            <li>
              <Link href="/auth/login">
                <a>
                  <BiLock /> Đăng nhập
                </a>
              </Link>
            </li>
          )}

          {pathname !== "/auth/sign-up" && (
            <li>
              <Link href="/auth/sign-up">
                <a>
                  <BiCoffee size="16" /> {"t(LANG.SignUp)"}
                </a>
              </Link>
            </li>
          )}

          {pathname !== "/auth/recover-password-request" && (
            <li>
              <Link href="/auth/recover-password-request">
                <a>
                  <BiKey /> Khôi phục mật khẩu
                </a>
              </Link>
            </li>
          )} */}

                {/* {pathname !== '/auth/verify-account-request' && (
                        <li>
                            Tài khoản của bạn chưa được kích hoạt?{' '}
                            <Link href="/auth/verify-account-request">
                                <a>Yêu cầu kích hoạt</a>
                            </Link>
                            .
                        </li>
                    )} */}
                {/* </ul> */}
            </div>
        </div>
    );
};

export default AuthFooter;
