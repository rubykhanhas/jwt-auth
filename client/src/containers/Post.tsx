import {IPost} from "@/app/api/post.type";
import {useAppDispatch, useAppSelector} from "@/app/redux";
import {deletePost} from "@/app/slice/post.slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {forwardRef, LegacyRef, useState} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import Swal from "sweetalert2";

const Post = forwardRef((props: IPost, ref: LegacyRef<HTMLDivElement>) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.auth.userID);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    try {
      const wrapped = await dispatch(deletePost({postID: props._id}));
      const res = unwrapResult(wrapped);
      if (res?.success == true) {
        Swal.fire({
          title: "Delete",
          text: "deleted successfully",
          icon: "success",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Swal.fire({
          title: "Delete",
          text: error.response?.data,
          icon: "error",
        });
      }
    }
  };

  return (
    <div
      className="relative flex flex-col rounded-md bg-third p-4 shadow-md"
      data-id={props._id}
      ref={ref}>
      <p className="text-[0.875em] text-black/70">{props.author.username}</p>
      <p className="my-2 text-[1.25em] font-medium text-primary">{props.title}</p>
      <p className="whitespace-pre-wrap rounded-md bg-white/50 p-[0.5em]">{props.description}</p>
      {userID === props.author._id && (
        <div className="absolute top-4 right-4">
          <button
            className="h-[2em] w-[2em] rounded-full bg-white/50 text-center align-middle text-[1em] leading-[2em] text-black/70"
            onClick={() => setOpenModal(true)}
            onBlurCapture={() => setTimeout(() => setOpenModal(false), 100)}>
            <BsThreeDotsVertical className="inline-block text-[1.25em]" />
          </button>
          {openModal && (
            <ul className="absolute top-4 left-4 flex flex-col rounded bg-white py-2 shadow">
              <li
                className="cursor-pointer px-4 capitalize transition-colors hover:bg-gray-200"
                onClick={() => {
                  setOpenModal(false);
                  handleDelete();
                }}>
                delete
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
});

export default Post;
