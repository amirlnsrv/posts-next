"use client";

import React, { useReducer } from "react";
import { Post } from "@/types/postType";

import styles from "./BlogItem.module.css";
import { Button } from "@/ui/Button";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/DeleteButton";

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
        <Button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Изменить
        </Button>

        <DeleteButton postId={String(id)} onDelete={() => dispatch({ type: "DELETE" })} /> 
      </div>
    </div>
  );
};
