import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ErrorPopup from "../../libs/ui/components/modals/ErrorPopup";
import { loginUser, cleanLoginErrors } from "../../modules/Auth/store/actions";
import { loginInitialValues } from "../../modules/Auth/store/initialState";
import { signInErrorsSelector } from "../../modules/Auth/store/selectors";
import { LoginFormValues } from "../../modules/Auth/store/types";
import { Button, InputAdornment, Typography } from "@mui/material";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router";
import { AuthFormContainer } from "../../libs/ui/components/AuthFormContainer";
import { AuthContainer } from "../../libs/ui/components/AuthContainer";
import { LoginValidationSchema } from "../../libs/utils/validations";
import { FormikTextField } from "../../libs/ui/components/FormInput";

const SignIn = () => {
  const errors = useSelector(signInErrorsSelector);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandle = (values: LoginFormValues) => {
    const form = values;
    dispatch(loginUser(form));
  };

  return (
    <AuthContainer>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={LoginValidationSchema()}
        onSubmit={submitHandle}
      >
        {() => (
          <AuthFormContainer>
            <Typography variant="h4" sx={{ color: "#bdbdbd" }}>
              Login
            </Typography>

            <FormikTextField
              name="email"
              label="Email"
              type="email"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" disablePointerEvents>
                      <Person sx={{ color: "#bdbdbd" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormikTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={(e) => setShowPassword(!showPassword)}
                      sx={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <Visibility sx={{ color: "#bdbdbd" }} />
                      ) : (
                        <VisibilityOff sx={{ color: "#bdbdbd" }} />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit">Login</Button>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "#bdbdbd" }}
            >
              Don't have an account?{" "}
              <Link
                to="/registration"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </AuthFormContainer>
        )}
      </Formik>
      <ErrorPopup errors={errors} clean={cleanLoginErrors} />
    </AuthContainer>
  );
};

export default SignIn;
