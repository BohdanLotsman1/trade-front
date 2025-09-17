import * as Yup from "yup";

const required = "This field is required";

export const LoginValidationSchema = () =>
  Yup.object({
    email: Yup.string().email().required(required).label("Email"),
    password: Yup.string(),
  });

export const RegisterValidationSchema = () =>
  Yup.object({
    email: Yup.string().email().required(required).label("Email"),
    name: Yup.string().min(2).max(100).required(required).label("Nick name"),
    password: Yup.string()
      .min(8)
      .matches(
        /^(?=.*[a-zA-Z]).+$/,
        "Password must contain at least 1 alphabetic character"
      )
      .matches(/\d/, "Password must contain at least 1 number")
      .label("Password"),
    password_confirmation: Yup.string()
      .min(8)
      .oneOf([Yup.ref("password")], "Passwords don`t match")
      .label("Password confirmation"),
  });

export const BetValidationSchema = () =>
  Yup.object({
    time: Yup.number()
      .required(required)
      .label("Time")
      .min(1, "1 minute is a minimal diapazone"),
    trade_price: Yup.number()
      .required(required)
      .label("Price")
      .min(10, "10$ it's a minimal bet"),
  });
