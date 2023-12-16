
import { FC } from "react";
import prisma from '../../../prisma/index';
import Comments from "@/components/Comments";
import FormComment from "@/components/FormComment";
interface BlogDetailsPageProps {
  params: {
    id: string;
  };
}
const BlogDetailsPage: FC<BlogDetailsPageProps> = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });
  // console.log(post);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="text-amber-600">Written By: {post?.author?.name}</p>
      <div className="mt-4 text-xl">
        {post?.content}
      </div>

      <Comments postId={params.id} />
      <FormComment postId={params.id} />
    </div>
  );
};
export default BlogDetailsPage;
