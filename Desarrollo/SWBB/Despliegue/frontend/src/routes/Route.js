import React, { useState } from "react";
import { Storage } from "../Utils/Storage";

import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import DefaultLayout from "../_layouts/default/DefaultLayout";
import AuthLayout from "../_layouts/auth/AuthLayout";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = false;
  const [customer, setCustomer] = useState(
    Storage.GetItem("customer") ? Storage.GetItem("customer") : false
  );

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !signed) {
    return <Redirect to="/" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  if (!isPrivate && signed) {
    return <Redirect to="/home" />;
  }

  const Layout = signed ? AuthLayout : DefaultLayout;

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout customer={customer} setCustomer={setCustomer}>
          <Component {...props} customer={customer} setCustomer={setCustomer} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
