import { BASE_URL } from "@/baseUrl";
import { Post } from "@/types/postType";
import React from "react";
import { DeleteButton } from "@/components/DeleteButton";
import { Button } from "@/ui/Button";

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

export default async function PostDetail({ params: { post } }: Props) {
  const postData = await getPost(post);

  return (
    <div>
      <p>{postData.title}</p>
      <p>{postData.body}</p>
      <Button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        Изменить
      </Button>
      <DeleteButton postId={post} />
    </div>
  );
}
