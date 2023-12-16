
import Link from "next/link";
import prisma from '../../prisma/index';


const BlogsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    }
    ,
    include: {
      author: true,
    },
  });
  // console.log(posts);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 gap-4 ">
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
              <p className="text-yellow-900 font-bold ">
                Written by: {post.author?.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default BlogsPage;
