import React, { memo } from "react";
import { TileType, Value } from "../interfaces";

import styles from "./Tile.module.scss";

interface TileProps {
  value: Value;
  type: TileType;
  x: number;
  y: number;
}

const Tile = memo((props: TileProps) => {
  return (
    <div
      className={styles[`tile tile-${props.value}`]}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
    >
      <div className={styles[`tileInner ${props.type}`]}>{props.value}</div>
    </div>
  );
});

export default Tile;
