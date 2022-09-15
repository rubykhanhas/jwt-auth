import LoginForm from "@/containers/LoginForm";
import {Link} from "react-router-dom";

function LoginPage() {
  return (
    <div className="container grid min-h-screen place-items-center">
      <div className="col-auto">
        <div className="min-w-[320px] max-w-[90vw] space-y-4 rounded bg-secondary p-6 shadow">
          <LoginForm />
          <Link
            className="mt-4 inline-block text-black/80 underline-offset-4 hover:underline"
            to="/register">
            new account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
