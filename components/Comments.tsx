import { FC } from "react"

import { format } from "date-fns";
import prisma from '../prisma/index';
interface CommentsProps {
  postId: string
}
const Comments: FC<CommentsProps> = async ({ postId }) => {

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    }
  })



  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">Comments</h1>
      <ul>
        {
          comments.map((comment) => (
            <li key={comment.id} className="mb-4 bg-gray-100 p-4">
              <div className="flex items-center mb-2">
                <div className="text-orange-700 font-bold mr-2">{comment.author?.name}</div>
                <div className="text-gray-700">{format(comment.createdAt, "dd MMMM,yyyy ")}</div>
              </div>
              <p>{comment.text}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default Comments