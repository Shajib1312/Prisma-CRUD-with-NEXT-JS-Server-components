"use client";
import axios from "axios";

import { FC, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
interface FormCommentProps {
  postId: string
}

const FormComment: FC<FormCommentProps> = ({ postId }) => {
  const { data } = useSession()
  const router = useRouter()
  const [comment, setComment] = useState<string>("");
  const handleSubmit = async () => {
    if (comment.trim() !== "") {
      try {
        const newComment = await axios.post("/api/comments", {
          postId,
          text: comment
        });

        if (newComment.status === 200) {
          router.refresh()
        }

      } catch (error: any) {
        console.log(error.massage)
      }
    }

    setComment("");
  }
  return (
    <div>
      <div className="mt-4">
        <label
          htmlFor="comment"
          className="block text-sm font-bold text-gray-700 cursor-pointer mb-2"
        >
          Add a comment
        </label>
        <input
          className="w-full text-amber-800 px-4 py-2 border border-gray-300 rounded outline-none focus:outline-offset-1"
          type="text"
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="write your comment here..."
        />
        <button
          disabled={!data?.user?.email}
          className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold px-4 py-2 rounded-md mt-2 disabled:bg-gray-600"
          type="submit"
          onClick={handleSubmit}
        >
          submit comment
        </button>
      </div>
    </div>
  );
};
export default FormComment;
