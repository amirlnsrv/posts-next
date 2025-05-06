"use client";

import { BASE_URL } from "@/baseUrl";
import React, { JSX, useEffect, useState } from "react";
import { Loader } from "@/components/Loader";

import styles from "./Home.module.css";
import { BlogItem } from "@/components/BlogItem";
import { Post } from "@/types/postType";
import { Pagination } from "@/components/Pagination";

export default function Blog(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const limit = 20;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data: Post[] = await res.json();

        const total = Number(res.headers.get("X-Total-Count")) || 0;
        setTotalPages(Math.ceil(total / limit));

        setPosts(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className={styles.blog}>
      <h1 className="text-center text-3xl font-bold mb-6">Список постов</h1>

      {isLoading && <Loader />}
      {!isLoading && posts.length === 0 && (
        <p className="text-center mt-4 text-gray-500">Нет постов.</p>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="space-y-4 my-6">
          {posts.map((item) => (
            <BlogItem
              key={item.id}
              title={item.title}
              body={item.body}
              id={item.id}
            />
          ))}
        </div>
      )}

      {/* Пагинация */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
