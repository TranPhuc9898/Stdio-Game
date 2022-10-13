import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
  const { id, children, className, onClick } = props;

  return (
    <button
      id={id ? styles[id] : ""}
      className={styles[`appButton ${className || ""}`]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
