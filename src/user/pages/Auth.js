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

const Auth = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.inputs.email.value,
            password: formData.inputs.password.value,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setIsLoading(false);
        login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.inputs.username.value,
            email: formData.inputs.email.value,
            password: formData.inputs.password.value,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          //if response is not ok i.e, if the status is not 2xx series, then throw an error
          throw new Error(data.message);
        }

        setIsLoading(false);
        login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      }
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

  const errorModalHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal onClear={errorModalHandler} error={error} />
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
            errorMessage="Please enter a valid password (min 5 characters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
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
