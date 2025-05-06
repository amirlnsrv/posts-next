"use client";

import React, { useReducer } from "react";

import styles from "./BlogItem.module.css";
import { Button } from "@/ui/Button";
import { useRouter } from "next/navigation";

interface BlogItemProps {
  title: string;
  body: string;
  id: number;
}

type State = {
  isDeleted: boolean;
};

type Action = { type: "DELETE" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DELETE":
      return { ...state, isDeleted: true };
    default:
      return state;
  }
};
import { Post } from "@/types/postType";

export const BlogItem: React.FC<BlogItemProps> = ({ title, body, id }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, { isDeleted: false });
  const handleDelete = () => {
    dispatch({ type: "DELETE" });
  };
  if (state.isDeleted) return null;

  return (
    <div className={styles.post}>
      <div className={`${styles.postBody} cursor-pointer`} onClick={() => router.push(`/${id}`)}>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className={styles.postButtons}>
        <Button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Изменить
        </Button>
        <Button
          onClick={handleDelete}
          className="cursor-pointer bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};
