import {ICreatePostValue} from "@/app/api/post.type";
import {SubmitHandler, useForm} from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import PostAPI from "@/app/api/post.api";
import {AxiosError} from "axios";

const newPostSchema = yup.object({
  title: yup.string().required().trim(),
  description: yup.string().required().trim(),
});

function NewPost() {
  const {register, handleSubmit} = useForm<ICreatePostValue>({
    resolver: yupResolver(newPostSchema),
  });
  const submitHandler: SubmitHandler<ICreatePostValue> = async (value) => {
    try {
      const res = await PostAPI.newPost(value);
      if (res.data.success == true) {
        Swal.fire({
          title: "Upload new post",
          text: res.data.msg,
          icon: "success",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError)
        Swal.fire({
          title: "Upload new post",
          text: error.response?.data,
          icon: "error",
        });
    }
  };

  return (
    <form
      className="relative flex flex-col space-y-2 rounded-md bg-third p-[1em] shadow-md"
      onSubmit={handleSubmit(submitHandler)}
      autoComplete={"off"}>
      <input
        className="rounded bg-white/60 p-[0.5em] text-[1em] font-medium text-black/80 outline-none"
        type="text"
        placeholder="title"
        {...register("title")}
      />
      <textarea
        className="min-h-[6em] rounded-md bg-white/50 p-[0.5em] text-black/80 outline-none"
        placeholder="description"
        {...register("description")}
      />
      <button className="self-end rounded bg-fourth/30 py-[0.25em] px-[0.75em] uppercase">
        upload
      </button>
    </form>
  );
}

export default NewPost;
