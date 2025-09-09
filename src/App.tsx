import React from "react";
import { Provider } from "react-redux";

import "./style.scss";
import store from "./libs/store";
import { RouterProvider } from "react-router";
import { router } from "./router";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
