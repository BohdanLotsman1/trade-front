import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { signUpErrorsSelector } from "../../modules/Auth/store/selectors";
import ErrorPopup from "../../libs/ui/components/modals/ErrorPopup";
import { RegistrationFormValues } from "../../modules/Auth/store/types";
import {
  cleanLoginErrors,
  registerUser,
} from "../../modules/Auth/store/actions";
import { registrationInitialValues } from "../../modules/Auth/store/initialState";
import { RegisterValidationSchema } from "../../libs/utils/validations";
import { AuthContainer } from "../../libs/ui/components/AuthContainer";
import { AuthFormContainer } from "../../libs/ui/components/AuthFormContainer";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import { FormikTextField } from "../../libs/ui/components/FormInput";

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
    <AuthContainer>
      <Formik
        initialValues={registrationInitialValues}
        validationSchema={RegisterValidationSchema}
        onSubmit={submitHandle}
      >
        {() => (
          <AuthFormContainer>
            <Typography variant="h4" sx={{ color: "#bdbdbd" }}>
              Let's get started
            </Typography>
            <Typography variant="body1" sx={{ color: "#bdbdbd" }}>
              Register to Trade.io!
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#bdbdbd" }}>
                What's your Name?
              </Typography>
              <FormikTextField name="name" label="First name" type="text" />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#bdbdbd" }}>
                What's your Email?
              </Typography>
              <FormikTextField name="email" label="Email" type="email" />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#bdbdbd" }}>
                Enter your password
              </Typography>
              <FormikTextField
                name="password"
                label="Password"
                type="password"
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: "#bdbdbd" }}>
                Confirm your password
              </Typography>
              <FormikTextField
                name="password_confirmation"
                label="Confirm Password"
                type="password"
              />
            </Box>

            <Button type="submit">Register</Button>
            <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
              Already have an account? <Link to="/login">Log in</Link>
            </Typography>
          </AuthFormContainer>
        )}
      </Formik>

      <ErrorPopup errors={errors} clean={cleanLoginErrors} />
    </AuthContainer>
  );
};

export default SignUp;
