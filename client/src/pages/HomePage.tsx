import {useAppDispatch, useAppSelector} from "@/app/redux";
import {getPosts} from "@/app/slice/post.slice";
import NewPost from "@/containers/NewPost";
import Post from "@/containers/Post";
import RequiredAuth from "@/containers/RequiredAuth";
import {useEffect, useRef} from "react";
import {CgSpinner} from "react-icons/cg";
import {useDebounce, useIntersection, useWindowScroll} from "react-use";

function HomePage() {
  const __LIMIT = 5;
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.post);
  const lastPostRef = useRef<HTMLDivElement>(null);
  const windowScroll = useWindowScroll();
  const intersection = useIntersection(lastPostRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const fetch = async () => {
    await dispatch(getPosts({limit: __LIMIT, skip: post.posts.length}));
  };
  /* get posts when page loaded */
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
    <div className="container grid grid-cols-4 py-2">
      <div className="col-span-full md:col-span-2 md:col-start-2">
        <div className="flex flex-col space-y-4">
          <RequiredAuth>
            <NewPost />
          </RequiredAuth>
          {post.posts.length == 0 && (
            <p className="text-center text-[1.25em] text-primary">0 post was found</p>
          )}
          {post.posts.map((_post, index) => {
            /* infinite scroll on last post */
            if (index == post.posts.length - 2)
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

export default HomePage;
