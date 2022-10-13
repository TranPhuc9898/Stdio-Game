import React from "react";
import Button from "../Button";
import { useGameContext } from "../Game";
import ScoresContainer from "../ScoresContainer";

import styles from "./GameHeader.module.scss";

const GameTitle = () => <span className={styles.gameTitle}>2048</span>;

const GameDescription = () => {
  return (
    <div>
      <span>
        Join the numbers to get <b>2048</b>!
      </span>
      <br />
      <a href="#howToPlaySection">How to play →</a>
    </div>
  );
};

export const GameHeader = () => {
  const { dispatch } = useGameContext();

  return (
    <div className={styles.header}>
      <div className={styles.gameIntro}>
        <GameTitle />
        <GameDescription />
      </div>
      <div className={styles.actions}>
        <ScoresContainer />
        <Button
          id={styles.restartGameBtn}
          onClick={(_) => dispatch({ type: "restart" })}
        >
          New Game
        </Button>
      </div>
    </div>
  );
};
