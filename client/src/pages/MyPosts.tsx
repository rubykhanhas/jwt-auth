import {useAppDispatch, useAppSelector} from "@/app/redux";
import {getAuthorPosts} from "@/app/slice/post.slice";
import Post from "@/containers/Post";
import {useEffect, useRef} from "react";
import {CgSpinner} from "react-icons/cg";
import {useDebounce, useIntersection, useWindowScroll} from "react-use";

function MyPosts() {
  const __LIMIT = 5;
  const dispatch = useAppDispatch();
  const windowScroll = useWindowScroll();
  const lastPostRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(lastPostRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const post = useAppSelector((state) => state.post);
  const fetch = async () => {
    await dispatch(getAuthorPosts({limit: __LIMIT, skip: post.ownPosts.length}));
  };
  /* get author posts when page loaded */
  useEffect(() => {
    fetch();
  }, []);
  /* infinite scroll */
  useDebounce(
    () => {
      if (intersection?.intersectionRatio! > 0 && windowScroll.y > 0) {
        fetch();
      }
    },
    1000,
    [windowScroll.y]
  );

  return (
    <div className="container grid grid-cols-4 py-2 pb-4">
      <div className="col-span-full md:col-span-2 md:col-start-2">
        <div className="flex flex-col space-y-4">
          {post.ownPosts.length == 0 && (
            <p className="text-center text-[1.25em] text-primary">0 post was found</p>
          )}
          {post.ownPosts.map((_post, index) => {
            /* infinite scroll on last post */
            if (index == post.ownPosts.length - 2)
              return <Post {..._post} key={_post._id} ref={lastPostRef} />;
            return <Post {..._post} key={_post._id} />;
          })}
          {post.loading && (
            <div className="flex justify-center">
              <CgSpinner className="h-[2.5em] w-[2.5em] animate-spin text-fourth" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPosts;
