import React, { useState } from "react";
import { Card } from "../../shared/components/UIElements";

import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./Auth.css";

const Auth = () => {
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

  const [isLoginMode, setIsLoginMode] = useState(true);

  const authHandler = (event) => {
    event.preventDefault();
    console.log(formData.inputs);
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
    <Card className="authentication">
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
  );
};

export default Auth;
