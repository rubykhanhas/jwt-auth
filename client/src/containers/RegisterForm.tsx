import AuthAPI from "@/app/api/auth.api";
import {Alert, Button, Form, Input} from "@/views/Form.styled";
import {yupResolver} from "@hookform/resolvers/yup";
import {AxiosError} from "axios";
import Swal from "sweetalert2";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";

const registerSchema = yup.object({
  username: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .min(5)
    .max(30)
    .matches(/^([a-z0-9_])+$/g, "username invalid"),
  email: yup.string().email().required().trim().lowercase(),
  password: yup.string().required().trim().min(6).max(30),
});

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IRegisterValue>({resolver: yupResolver(registerSchema)});

  const submitHandler: SubmitHandler<IRegisterValue> = async (value) => {
    try {
      const res = await AuthAPI.register(value);
      if (res.data.success == true) {
        const fired = await Swal.fire({
          title: "Register",
          text: res.data.msg,
          icon: "success",
        });
        if (fired.isConfirmed) navigate("/login", {replace: true});
      }
    } catch (error) {
      if (error instanceof AxiosError)
        Swal.fire({
          title: "Register",
          text: error.response?.data,
          icon: "error",
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)} autoComplete={"off"}>
      <Input type={"email"} placeholder="email" {...register("email")} />
      {errors.username?.message && <Alert>{errors.username.message}</Alert>}
      <Input type={"text"} placeholder="username" {...register("username")} />
      {errors.username?.message && <Alert>{errors.username.message}</Alert>}
      <Input type={"password"} placeholder="password" {...register("password")} />
      {errors.username?.message && <Alert>{errors.username.message}</Alert>}
      <Button>register</Button>
    </Form>
  );
}

export default RegisterForm;
