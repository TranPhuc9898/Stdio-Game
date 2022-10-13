import { isEmpty } from 'lodash';
import Link from 'next/link';
import { FC } from 'react';

import { SITE_URL } from '@stdio/configs/config';
import { IProfile } from '@stdio/configs/custom-types';
import { getMediaURL } from '@stdio/core/libs/custom-utils';
import FollowButton from '../FollowButton';

import styles from './ProfileItem.module.scss';

interface IProps {
    profile: IProfile;
}

const ProfileItem: FC<IProps> = ({ profile }) => {
    if (isEmpty(profile)) return null;

    const { _id, firstName, lastName, job, username = '' } = profile;

    const a = {
        profile: {
            href: `/@${username}`,
            url: `${SITE_URL}/@${username}`,
        },
    };

    const pictureUrl = getMediaURL(profile?.picture[4] ?? '');
    const coverUrl = getMediaURL(profile?.cover[3] ?? '');

    return (
        <div className={styles.profileItem}>
            <div className={styles.profileItemCover}>
                <div className={styles.cover}>
                    <div
                        className={styles.background}
                        style={{
                            backgroundImage: `url(${coverUrl})`,
                        }}
                    />
                </div>
                <Link href={a.profile.href}>
                    <a className={styles.thumbnail}>
                        {/* <img src={pictureUrl} alt={`${lastName} ${firstName}`} /> */}
                    </a>
                </Link>
            </div>

            <div className={styles.board}>
                <h3>
                    <Link href={a.profile.href}>
                        <a>
                            {lastName} {firstName}
                        </a>
                    </Link>
                </h3>
                <p>{job}</p>
            </div>

            <div className={styles.buttons}>
                <FollowButton targetProfileId={_id} />
            </div>
        </div>
    );
};

export default ProfileItem;
