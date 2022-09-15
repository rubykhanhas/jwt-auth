import {useAppDispatch, useAppSelector} from "@/app/redux";
import {logout, refresh} from "@/app/slice/auth.slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {Fragment} from "react";
import {CgSpinner} from "react-icons/cg";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import RequiredAuth from "../RequiredAuth";

function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const wrapped = await dispatch(logout());
      const res = unwrapResult(wrapped);
      if (res?.success) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Swal.fire({
          title: "Logout",
          text: error.response?.data,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-end space-x-4 font-medium text-primary">
      <RequiredAuth>
        <Fragment>
          {auth.loading && <CgSpinner className="h-[1.5em] w-[1.5em] animate-spin text-fourth" />}
          <p className="text-white/90">{auth.username}</p>
          <button
            className="rounded-full bg-red-300 px-[0.5em] py-[0.25em] capitalize"
            onClick={handleLogout}>
            logout
          </button>
        </Fragment>
      </RequiredAuth>
      {!auth.username && (
        <Link
          className="inline-block rounded-full bg-white/70 px-[0.5em] py-[0.25em] capitalize"
          to={"login"}>
          login
        </Link>
      )}
    </div>
  );
}

export default Auth;
