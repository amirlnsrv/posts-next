import React from "react";

type Props = {
  params: {
    post: number;
  };
};

export default function Post({ params: { post } }: Props) {
  return <div>Post {post}</div>;
}
