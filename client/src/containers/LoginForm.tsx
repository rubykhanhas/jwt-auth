import {useAppDispatch, useAppSelector} from "@/app/redux";
import {login} from "@/app/slice/auth.slice";
import {Alert, Button, Form, Input} from "@/views/Form.styled";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

const loginSchema = yup.object({
  username: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .min(5)
    .max(30)
    .matches(/^([a-z0-9_])+$/g, "username invalid"),
  password: yup.string().required().trim().min(6).max(30),
});

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMessage = useAppSelector((state) => state.auth.error);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginValue>({resolver: yupResolver(loginSchema)});

  const submitHandler: SubmitHandler<ILoginValue> = async (value) => {
    await dispatch(login(value));
    if (errorMessage) {
      await Swal.fire({
        title: "Login",
        text: errorMessage,
        icon: "error",
      });
    } else navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)} autoComplete={"off"}>
      <Input type={"text"} placeholder="username" {...register("username")} />
      {errors.username?.message && <Alert>{errors.username.message}</Alert>}
      <Input type={"password"} placeholder="password" {...register("password")} />
      {errors.password?.message && <Alert>{errors.password.message}</Alert>}
      {errorMessage && <Alert>{errorMessage}</Alert>}
      <Button>login</Button>
    </Form>
  );
}

export default LoginForm;
