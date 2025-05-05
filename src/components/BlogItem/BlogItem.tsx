import React from "react";

import styles from "./BlogItem.module.css";
import { Button } from "@/ui/Button";

interface BlogItemProps {
  title: string;
  body: string;
}

export const BlogItem: React.FC<BlogItemProps> = ({ title, body }) => {
  return (
    <div className={styles.post}>
      <div className={styles.postBody}>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className={styles.postButtons}>
        <Button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Изменить
        </Button>
        <Button className="cursor-pointer bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Удалить
        </Button>
      </div>
    </div>
  );
};
