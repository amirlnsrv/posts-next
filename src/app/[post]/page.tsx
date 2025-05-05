import { BASE_URL } from "@/baseUrl";
import { Post } from "@/types/postType";
import React from "react";


type Props = {
  params: {
    post: string;
  };
};

async function getPost(postId: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/${postId}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PostDeatail({ params: { post } }: Props) {
  const postData = await getPost(post);

  return (
    <div>
      <h1>Post {post}</h1>
      <p>{postData.title}</p>
      <p>{postData.body}</p>
      <p>User ID: {postData.userId}</p>
      <p>ID: {postData.id}</p>
    </div>
  );
}
