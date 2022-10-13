import React from "react";

import styles from "./ScoreBox.module.scss";

interface ScoreBoxProps {
  title: string;
  score: number;
}

export const ScoreBox = (props: ScoreBoxProps) => {
  return (
    <div className={styles.scoreBox}>
      <span className={styles.title}>{props.title}</span>
      <span className={styles.score}>{props.score}</span>
    </div>
  );
};
