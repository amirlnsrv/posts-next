"use client";

import { BASE_URL } from "@/baseUrl";
import React from "react";

import styles from "./Home.module.css";
import { BlogItem } from "@/components/BlogItem";

export default function Blog() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(BASE_URL);
        const data = await res.json();

        setPosts(data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.blog}>
      {posts.map((item) => (
        <BlogItem key={item.id} title={item.title} body={item.body} />
      ))}
    </div>
  );
}
