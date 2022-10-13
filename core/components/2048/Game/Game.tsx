import React, { useContext, useEffect } from "react";
import Board from "../Board";

import {
  areEqual,
  createRandomTile,
  generateBoard,
  isGameOver,
  isGameWon,
  merge,
  MOVES_MAP,
} from "../../../utils/boardUtils";
import GameHeader from "../GameHeader";
import GameFooter from "../GameFooter";
import useGameLocalStorage from "../../../hooks/useLocalStorage";
import { KEYBOARD_ARROW_TO_DIRECTION_MAP } from "../../../components/2048/constants/constants";
import {
  IGameContext,
  Tile,
  GameStatus,
  GameState,
  GameContextActionType,
  Direction,
} from "../interfaces";
import styles from "./Game.module.scss";

const GameContext = React.createContext<IGameContext>(null as any);

const getGameStatus = (tiles: Tile[]): GameStatus => {
  if (isGameOver(tiles)) {
    return "GAME_OVER";
  }

  if (isGameWon(tiles)) {
    return "WIN";
  }

  return "IN_PROGRESS";
};

const initState = (tilesCount = 2): GameState => {
  return {
    tiles: generateBoard(tilesCount),
    lastMove: null as any,
    status: "IN_PROGRESS",
  };
};

function gameReducer(state: GameState, action: GameContextActionType) {
  switch (action.type) {
    case "restart": {
      return initState();
    }
    case "continue": {
      return { ...state, status: "PLAY_AFTER_WIN" };
    }
    case "move": {
      const move = MOVES_MAP[action.payload];
      let tiles: Tile[] = move(state.tiles);
      if (areEqual(state.tiles, tiles)) {
        return state;
      }

      tiles = merge(tiles);
      tiles = [...tiles, createRandomTile(tiles)];
      const status = getGameStatus(tiles);
      const shouldChangeStatus =
        state.status !== "PLAY_AFTER_WIN" || status === "GAME_OVER";

      return {
        tiles,
        lastMove: action.payload,
        status: shouldChangeStatus ? status : state.status,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

const GameProvider = (props: any) => {
  const [state, dispatch] = useGameLocalStorage<GameState>(
    "game",
    initState(),
    gameReducer
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const direction: Direction | undefined =
        KEYBOARD_ARROW_TO_DIRECTION_MAP[e.key];
      if (direction) {
        dispatch({ type: "move", payload: direction });
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  return (
    <GameContext.Provider value={{ gameState: state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};

const Game = () => {
  return (
    <GameProvider>
      <div className={styles.container}>
        <div className={styles.gameContainer}>
          <GameHeader />
          <Board />
        </div>
        <GameFooter />
      </div>
    </GameProvider>
  );
};

function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
}

export { Game, useGameContext };
