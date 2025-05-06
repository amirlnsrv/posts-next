"use client";

import { useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function PostForm() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  };

  return (
    
    
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">
          Добавить пост
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
