"use client";
import { BASE_URL } from "@/baseUrl";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button";

type Props = {
  postId: string;
  onDelete?: () => void;
};

export const DeleteButton = ({ postId, onDelete }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Вы уверены, что хотите удалить пост?");
    if (!confirmed) return;

    try {
      await fetch(`${BASE_URL}/${postId}`, {
        method: "DELETE",
      });

      const deletedIds = JSON.parse(localStorage.getItem("deletedPosts") || "[]");
      localStorage.setItem("deletedPosts", JSON.stringify([...deletedIds, postId]));

      if (onDelete) {
        onDelete();
      }

      router.push("/");

    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      className="cursor-pointer bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Удалить
    </Button>
  );
};
