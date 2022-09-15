import RegisterForm from "@/containers/RegisterForm";
import {Link} from "react-router-dom";

function RegisterPage() {
  return (
    <div className="container grid min-h-screen place-items-center">
      <div className="col-auto">
        <div className="min-w-[320px] max-w-[90vw] space-y-4 rounded bg-secondary p-6 shadow">
          <RegisterForm />
          <Link
            className="mt-4 inline-block text-black/80 underline-offset-4 hover:underline"
            to="/login">
            already have account ?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
