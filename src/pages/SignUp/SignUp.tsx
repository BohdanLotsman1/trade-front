import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpErrorsSelector } from "../../modules/Auth/store/selectors";
import ErrorPopup from "../../libs/ui/components/modals/ErrorPopup";
import { RegistrationFormValues } from "../../modules/Auth/store/types";
import {
  cleanLoginErrors,
  registerUser,
} from "../../modules/Auth/store/actions";
import { registrationInitialValues } from "../../modules/Auth/store/initialState";

const required = "This field is required";

const RegisterValidationSchema = () =>
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

const SignUp = () => {
  const dispatch = useDispatch();

  const errors = useSelector(signUpErrorsSelector);

  const submitHandle = (values: RegistrationFormValues) => {
    dispatch(
      registerUser({
        email: values.email,
        name: values.name,
        password: values.password,
      })
    );
  };

  return (
    <div className="signUp">
      <h1>Let's get started</h1>
      <p className="mb-2 form-title">Register to Trade.io!</p>

      <Formik
        initialValues={registrationInitialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={submitHandle}
      >
        {() => (
          <Form className="form">
            <div className="mb-1">
              <span>What's your Name?</span>
              <Field
                name="name"
                placeholder="First name"
                type="text"
                className="form-input"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="mb-1">
              <span>What's your Email?</span>
              <Field
                name="email"
                placeholder="Email"
                type="email"
                className="form-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="mb-1">
              <span>Enter your password</span>
              <Field
                name="password"
                placeholder="Password"
                type="password"
                className="form-input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="mb-1">
              <span>Confirm your password</span>
              <Field
                name="password_confirmation"
                placeholder="Confirm Password"
                type="password"
                className="form-input"
              />
              <ErrorMessage
                name="password_confirmation"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" className="form-submit">
              <span>Register</span>
            </button>
          </Form>
        )}
      </Formik>

      <ErrorPopup errors={errors} clean={cleanLoginErrors} />
    </div>
  );
};

export default SignUp;
