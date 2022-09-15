import {axiosPrivate} from "@/app/axios";
import {useAppDispatch, useAppSelector} from "@/app/redux";
import {refresh} from "@/app/slice/auth.slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import jwtDecode, {JwtPayload} from "jwt-decode";
import Swal from "sweetalert2";

export default function usePrivate() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  axiosPrivate.interceptors.request.use(async (fulfilled) => {
    try {
      let accessToken = auth.accessToken;
      const now_sec = new Date().getTime() / 1000;
      const decoded = jwtDecode(accessToken) as JwtPayload;
      if (decoded.exp! < now_sec) {
        const wrapped = await dispatch(refresh());
        const res = unwrapResult(wrapped);
        if (res?.success == true) accessToken = res.data.accessToken;
      }
      fulfilled.headers!.Authorization = `Bearer ${accessToken}`;
      return fulfilled;
    } catch (error) {
      if (error instanceof AxiosError)
        Swal.fire({
          title: "Re-Authenticate",
          text: "expired login session",
          icon: "error",
        });
    }
  });

  return axiosPrivate;
}
