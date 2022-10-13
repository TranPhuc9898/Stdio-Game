import React, { FC, ReactNode } from "react";
import { CSSProperties } from "react";
import { BsSearch } from "react-icons/bs";

import styles from "./CmsContentLayout.module.scss";

interface IProps {
  message?: ReactNode;
  newItemButton?: {
    text: string;
    action: VoidFunction;
  };
  search?: ReactNode;
  filters?: ReactNode;
  searchButton?: ReactNode;
  table?: ReactNode;
  pagination?: ReactNode;
  onSearch?: any;
  optionalCenterStyle?: CSSProperties;
}

const CmsContentLayout: FC<IProps> = ({
  message,
  newItemButton,
  search,
  onSearch,
  filters,
  table,
  pagination,
  optionalCenterStyle,
}) => {
  return (
    <div className={styles.cmsContentLayout}>
      <div
        className={styles.cmsContentLayoutCenter}
        style={optionalCenterStyle}
      >
        {!!message && <div className={styles.message}>{message}</div>}
        {!!newItemButton && (
          <div className={styles.header}>
            <div className={styles.title}></div>
            <div className={styles.buttons}>
              <div
                className={styles.button}
                onClick={() => {
                  newItemButton.action();
                }}
              >
                {newItemButton.text}
              </div>
            </div>
          </div>
        )}
        {!!search && (
          <div className={styles.searchBar}>
            <div className={styles.search}>{search}</div>
            {!!onSearch && (
              <div className={styles.searchButton} onClick={onSearch}>
                <BsSearch />
              </div>
            )}
          </div>
        )}
        {!!filters && <div className={styles.filters}>{filters}</div>}
        {!!pagination && <div className={styles.pagination}>{pagination}</div>}
        {!!table && <div className={styles.table}>{table}</div>}
        {!!pagination && <div className={styles.pagination}>{pagination}</div>}
      </div>
    </div>
  );
};

export default CmsContentLayout;
