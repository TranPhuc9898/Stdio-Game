import { FC } from 'react';

import { IProfile } from '@stdio/configs/custom-types';

import styles from './ProfileScrollbarItem.module.scss';

interface IProps {
    profile?: IProfile;
}

const ProfileScrollbarItem: FC<IProps> = ({ profile = null }) => {
    if (!!profile) return null;

    // const { firstName, lastName, bio, job, picture, cover, username, _id } = profile;

    // const a = {
    //     profile: {
    //         href: '/@' + username,
    //         url: SITE_URL + '/@' + username,
    //     },
    // };

    // const profilePictureThumbnail = getMediaURL(picture?.[3] ?? '');
    // const profileCoverThumbnail = getMediaURL(cover?.[3] ?? '');

    return (
        <div className={styles.profileScrollbarItem}>
            {/* <div className={styles.profileScrollbarItemCover}>
                <div className={styles.cover}>
                    <div
                        className={styles.background}
                        style={{
                            backgroundImage: `url(${profileCoverThumbnail})`,
                        }}
                    />
                </div>
                <a href={a.profile.as} className={styles.thumbnail}>
                    <img src={profilePictureThumbnail} alt={`${lastName} ${firstName}`} width={96} height={96} />
                </a>
            </div>

            <div className={styles.profile}>
                <h3>
                    <a href={a.profile.as}>
                        {lastName} {firstName}
                    </a>
                </h3>
                <p>{job}</p>
            </div>

            <div className={styles.buttons}>
                <FollowButton targetProfileId={_id} />
            </div> */}
        </div>
    );
};

export default ProfileScrollbarItem;
