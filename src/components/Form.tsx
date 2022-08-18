import { useRef } from "react";
import { trpc } from "../utils/trpc";
const Form = () => {
  const utils = trpc.useContext();
  const createPost = trpc.useMutation(["post.createPost"], {
    onSuccess: () => {
      utils.invalidateQueries(["post.getAllPosts"]);
    },
  });
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <form
      className="flex flex-col w-80 mx-auto text-black border-t-2 fixed bottom-0 left-1/2 transform -translate-x-1/2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (
          !titleRef.current ||
          !bodyRef.current ||
          titleRef.current.value === "" ||
          bodyRef.current.value === ""
        )
          return;
        createPost.mutate({
          title: titleRef.current.value,
          body: bodyRef.current.value,
        });
        titleRef.current.value = "";
        bodyRef.current.value = "";
      }}
    >
      <input
        type="text"
        placeholder="title"
        className="border-2"
        ref={titleRef}
      />
      <textarea
        placeholder="body"
        className="border-2 resize-none"
        ref={bodyRef}
      />
      <input
        type="submit"
        className="text-white bg-blue-500 cursor-pointer p-2"
      />
    </form>
  );
};

export default Form;
