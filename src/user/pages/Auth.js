import React, { useContext, useState } from "react";
import { Card } from "../../shared/components/UIElements";

import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formData, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            email: formData.inputs.email.value,
            password: formData.inputs.password.value,
          })
        );
        login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            name: formData.inputs.username.value,
            email: formData.inputs.email.value,
            password: formData.inputs.password.value,
          })
        );
        login(responseData.newUser.id);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      delete formData.inputs.username;
      setFormData(
        { ...formData.inputs },
        formData.inputs.email.isValid && formData.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formData.inputs, username: { value: "", isValid: false } },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Authenticate</h2>
        <form action="" onSubmit={authHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              type="text"
              label="Username"
              id="username"
              errorMessage="Please enter a valid Username"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            type="email"
            label="E-Mail"
            id="email"
            errorMessage="Please enter a valid email address"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            type="password"
            label="Password"
            id="password"
            errorMessage="Please enter a valid password (min 6 characters)"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formData.isValid}>
            {isLoginMode ? "Login" : "SignUp"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Swith to SignUp" : "Swith to Login"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
