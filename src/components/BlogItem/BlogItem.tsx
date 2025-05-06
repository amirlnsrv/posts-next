"use client";

import React, { useReducer } from "react";
import { Post } from "@/types/postType";

import styles from "./BlogItem.module.css";
import { Button } from "@/ui/Button";
import { useRouter } from "next/navigation";

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

export const BlogItem: React.FC<Post> = ({ title, body, id }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, { isDeleted: false });
  const handleDelete = () => {
    dispatch({ type: "DELETE" });
  };
  if (state.isDeleted) return null;

  return (
    <div className={styles.post}>
      <div
        className={`${styles.postBody} cursor-pointer`}
        onClick={() => router.push(`/${id}`)}
      >
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className={styles.postButtons}>
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
