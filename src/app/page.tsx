"use client";

import { BASE_URL } from "@/baseUrl";
import React, { JSX, useEffect, useState } from "react";
import { Loader } from "@/components/Loader";

import styles from "./Home.module.css";
import { BlogItem } from "@/components/BlogItem";
import { Post } from "@/types/postType";

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

  const renderPageNumbers = () => {
    const pages = [];
    const maxShown = 5;
    let start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxShown - 1);

    if (end - start < maxShown - 1) {
      start = Math.max(1, end - maxShown + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-4 py-2 rounded font-semibold cursor-pointer ${
            page === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

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
      <div className="flex flex-wrap justify-center items-center gap-2 mt-8 text-lg">
        {page > 1 && (
          <button
            onClick={() => setPage(1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold cursor-pointer"
          >
            «
          </button>
        )}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded font-semibold ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
          }`}
        >
          ‹
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded font-semibold ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
          }`}
        >
          ›
        </button>
        {page < totalPages && (
          <button
            onClick={() => setPage(totalPages)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold cursor-pointer"
          >
            »
          </button>
        )}
      </div>
    </div>
  );
}
