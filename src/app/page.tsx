"use client";

import { BASE_URL } from "@/baseUrl";
import React from "react";

import styles from "./Home.module.css";
import { BlogItem } from "@/components/BlogItem";

export default function Blog() {
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const limit = 20;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className={styles.blog}>
      {posts.map((item) => (
        <BlogItem key={item.id} title={item.title} body={item.body} />
      ))}
      
    <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
      Назад
    </button>
    <span>Страница: {page}</span>
    <button onClick={() => setPage((prev) => prev + 1)}>Вперёд</button>
    </div>
  );
}
