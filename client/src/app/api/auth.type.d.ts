interface IRegisterValue {
  email: string;
  username: string;
  password: string;
}

interface IRegisterData {
  userID: string;
  username: string;
}

interface ILoginValue {
  username: string;
  password: string;
}

interface ILoginData {
  userID: string;
  username: string;
  accessToken: string;
}

interface ILogoutData {
  userID: string;
}

interface IRefreshData {
  accessToken: string;
}

interface IResetData {
  userID: string;
}
