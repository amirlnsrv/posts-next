"use client";

import { BASE_URL } from "@/baseUrl";
import React, { JSX, useEffect, useState } from "react";

import styles from "./Home.module.css";
import { BlogItem } from "@/components/BlogItem";
import { Post } from "@/types/postType";

export default function Blog(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className={styles.blog}>
      <h1 className="text-center text-3xl font-bold">Список постов</h1>
      {posts.map((item) => (
        <BlogItem
          key={item.id}
          title={item.title}
          body={item.body}
          id={item.id}
        />
      ))}

      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        Назад
      </button>
      <span>Страница: {page}</span>
      <button onClick={() => setPage((prev) => prev + 1)}>Вперёд</button>
    </div>
  );
}
