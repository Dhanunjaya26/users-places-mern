import React from "react";

import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const NewPlace = () => {
  const [formData, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formData.inputs);
  };

  return (
    <form className="place-form" onSubmit={formSubmitHandler}>
      <Input
        id="title"
        label="Title"
        type="text"
        element="input"
        errorMessage="Title should not be empty"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="description"
        label="Description"
        type="text"
        element="textarea"
        errorMessage="Description should be more than 5 characters"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
      <Input
        id="address"
        label="Address"
        type="text"
        element="input"
        errorMessage="Address should not be empty"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Button disabled={!formData.isValid}>Add Place</Button>
    </form>
  );
};

export default NewPlace;
