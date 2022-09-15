import {Link} from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container grid min-h-screen grid-cols-4 place-items-center">
      <div className="col-span-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-[2.5em] font-bold text-primary">404 page not found</h1>
          <Link className="inline-block underline-offset-4 hover:underline" to={"/"}>
            {" "}
            {"<-"} back to home page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
