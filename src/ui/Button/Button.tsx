import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className }) => {
  const combinedClassName = [styles.btn, className].filter(Boolean).join(" ");

  return <button className={combinedClassName}>{children}</button>;
};
