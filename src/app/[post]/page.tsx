"use client";

import { BASE_URL } from "@/baseUrl";
import { Post } from "@/types/postType";
import React, { useEffect, useState, use } from "react";
import styles from "./PostDetail.module.css";
import { DeleteButton } from "@/components/DeleteButton";

type Props = {
  params: Promise<{
    post: string;
  }>;
};

async function getPost(postId: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

async function patchPost(postId: string, data: Post) {
  const res = await fetch(`${BASE_URL}/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}



export default function PostDetail({ params }: Props) {
  const { post } = use(params);

  const [postData, setPostData] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    getPost(post).then((data) => {
      setPostData(data);
      setTitle(data.title);
      setBody(data.body);
    });
  }, [post]);

  const handleSave = async () => {
    if (!postData) return;
    const updated = await patchPost(post, { ...postData, title, body });
    setPostData(updated);
    setIsEditing(false);
  };

  if (!postData) return <p>Загрузка...</p>;

  return (
    <div className={styles.postContainer}>
      {isEditing ? (
        <>
          <input
            className={styles.editInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.editTextarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </>
      ) : (
        <>
          <p className={styles.postTitle}>{postData.title}</p>
          <p className={styles.postDescription}>{postData.body}</p>
        </>
      )}

      <div className={styles.buttonContainer}>
        {isEditing ? (
          <>
            <button
              className="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded transition duration-400"
              onClick={handleSave}
            >
              Сохранить
            </button>
            <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
              Отмена
            </button>
          </>
        ) : (
          <button
            className={styles.actionButton}
            onClick={() => setIsEditing(true)}
          >
            Изменить
          </button>
        )}
        <DeleteButton postId={post} />
      </div>
    </div>  
  );
}
