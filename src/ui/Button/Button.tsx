import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const combinedClassName = [styles.btn, className].filter(Boolean).join(" ");

  return <button className={combinedClassName} {...props}>{children}</button>;
};
