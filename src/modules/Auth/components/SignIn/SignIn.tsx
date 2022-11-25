import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUser, cleanLoginErrors } from "../../store/actions";
import { loginInitialValues } from "../../store/initialState";
import { LoginFormValues } from "../../store/types";
import "../style.scss";
import { signInErrorsSelector } from "../../store/selectors";
import ErrorPopup from "../../../../libs/ui/components/modals/ErrorPopup";

const SignIn = () => {
  const errors = useSelector(signInErrorsSelector);
  const dispatch = useDispatch();

  const required = "This field is required";
  const LoginValidationSchema = () =>
    Yup.object({
      email: Yup.string().email().required(required).label("Email"),
      password: Yup.string(),
    });

  const submitHandle = (values: LoginFormValues) => {
    const form = values;
    dispatch(loginUser(form));
  };

  return (
    <div className="signIn">
      <h1>Login</h1>

      <Formik
        initialValues={loginInitialValues}
        validationSchema={LoginValidationSchema()}
        onSubmit={submitHandle}
      >
        {() => (
          <Form className="form">
            <div className="mb-1">
              <span>Email</span>
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
              <span>Password</span>
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

            <button type="submit" className="form-submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
      <ErrorPopup errors={errors} clean={cleanLoginErrors} />
    </div>
  );
};

export default SignIn;
