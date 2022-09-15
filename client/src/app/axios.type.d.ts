export interface IAxiosResponse<T = any> {
  success: boolean;
  code: number;
  msg: string;
  data: T;
}
