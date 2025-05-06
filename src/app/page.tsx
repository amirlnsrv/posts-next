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
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const limit = 20;

  const newPost = {
    id: Date.now(),
    title,
    body,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts?_page=${page}&_limit=${limit}`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data: Post[] = await res.json();

        const total = 100;
        setTotalPages(Math.ceil(total / limit));

        setPosts(data);
      } catch (error) {
        console.error("Ошибка при загрузке :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      console.log("Заголовок или текст поста пустые");
      return;
    }
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("Ошибка при добавлении поста");

      const createdPost: Post = await res.json();
      setPosts([createdPost, ...posts]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Ошибка добавления:", error);
    }
  };

  return (
    <div className={styles.blog}>
      <h1 className="text-center text-3xl font-bold mb-6">Список постов</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!title.trim() || !body.trim()) return;

          // const newPost = {
          //   title,
          //   body,
          // };

          try {
            const res = await fetch("http://localhost:5000/posts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newPost),
            });

            if (!res.ok) throw new Error("Ошибка при добавлении поста");

            const created = await res.json();
            setPosts((prev) => [created, ...prev]);
            setTitle("");
            setBody("");
          } catch (error) {
            console.error("Ошибка:", error);
          }
        }}
        className="flex flex-col gap-2 mb-6"
      >
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Текст поста"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white p-2 rounded"
          type="submit"
        >
          Добавить пост
        </button>
      </form>

      {isLoading && <Loader />}
      {!isLoading && posts.length === 0 && (
        <p className="text-center mt-4 text-gray-500">Нет постов.</p>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="space-y-4 my-6">
          {posts.map((item, index) => (
            <BlogItem
              key={index}
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
