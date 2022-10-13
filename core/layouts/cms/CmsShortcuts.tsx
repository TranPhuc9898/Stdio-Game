import React, { FC } from "react";

import styles from "./CmsShortcuts.module.scss";

export interface IShortcut {
  icon: any;
  title: string;
  description: string;
  link: string;
}

interface IProps {
  shortcuts: IShortcut[];
}

const CmsShortcuts: FC<IProps> = ({ shortcuts }) => {
  return (
    <div className={styles.cmsShortcuts}>
      {shortcuts.map((shorcut, index) => (
        <a href={shorcut.link} key={index} className={styles.shortcut}>
          <div className={styles.icon}>{shorcut.icon}</div>
          <h3>{shorcut.title}</h3>
          <p>{shorcut.description}</p>
        </a>
      ))}
    </div>
  );
};

export default CmsShortcuts;
