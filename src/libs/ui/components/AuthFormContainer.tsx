import { Form } from "formik";
import React from "react";

export const AuthFormContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
      }}
    >
      {children}
    </Form>
  );
};
