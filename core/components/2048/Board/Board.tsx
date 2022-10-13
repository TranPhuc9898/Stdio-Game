import React from "react";
import { Tile } from "../interfaces";
import Tiles from "../Tiles";
import GameResult from "./GameResult";

import styles from "./Board.module.scss";

const BoardGrid = () => {
  const grid = Array.from(Array(4).keys()).map((rowId) => {
    const columns = Array.from(Array(4).keys()).map((colId) => (
      <div key={colId} className={styles.cell}></div>
    ));
    return (
      <div key={rowId} className={styles.row}>
        {columns}
      </div>
    );
  });

  return <div className={styles.gridContainer}>{grid}</div>;
};

const Board = (props: { tiles: Tile[] }) => {
  return (
    <div id={styles.boardContainer}>
      <GameResult tiles={props.tiles} />
      <BoardGrid />
      <Tiles tiles={props.tiles} />
    </div>
  );
};

export default Board;
