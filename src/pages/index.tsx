import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Form from "../components/Form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RefObject } from "react";

const Home: NextPage = () => {
  const [parent]: [RefObject<HTMLDivElement>] = useAutoAnimate();
  const utils = trpc.useContext();
  const posts = trpc.useQuery(["post.getAllPosts"]);
  const deletePost = trpc.useMutation(["post.deletePost"], {
    onSuccess: () => {
      utils.invalidateQueries(["post.getAllPosts"]);
    },
  });
  return (
    <>
      <div className="text-2xl text-blue-500 w-full h-full break-words">
        <h1 className="text-center fixed top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-80 h-10 z-50">
          Joshua&apos;s Bad Blog
        </h1>
        <div
          ref={parent}
          className="w-64 h-full border-2 flex justify-start items-center flex-col mx-auto overflow-y-scroll pb-32 pt-16"
        >
          {posts.data ? (
            posts.data.map((post) => (
              <div key={post.id} className="border-y-2 p-2 relative w-full">
                <span
                  onClick={() => deletePost.mutate(post.id)}
                  className="cursor-pointer absolute top-0 right-2 text-red-500"
                >
                  x
                </span>
                <h2>{post.title}</h2>
                <p className="text-black">{post.body}</p>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <Form />
      </div>
    </>
  );
};

export default Home;
