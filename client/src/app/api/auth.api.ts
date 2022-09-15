import {axiosDefault, axiosPrivate} from "../axios";
import {IAxiosResponse} from "../axios.type";

const AuthAPI = {
  BASE_URL: "/auth",
  register: function (value: IRegisterValue) {
    const URL = this.BASE_URL + "/register";
    return axiosDefault.post<IAxiosResponse<IRegisterData>>(URL, value);
  },
  login: function (value: ILoginValue) {
    const URL = this.BASE_URL + "/login";
    return axiosDefault.post<IAxiosResponse<ILoginData>>(URL, value, {
      withCredentials: true,
    });
  },
  logout: function () {
    const URL = this.BASE_URL + "/logout";
    return axiosPrivate.get<IAxiosResponse<ILogoutData>>(URL);
  },
  refresh: function () {
    const URL = this.BASE_URL + "/refresh";
    return axiosDefault.get<IAxiosResponse<IRefreshData>>(URL, {
      withCredentials: true,
    });
  },
  reset: function () {
    const URL = this.BASE_URL + "/reset";
    return axiosPrivate.get<IAxiosResponse<IResetData>>(URL);
  },
};

export default AuthAPI;
