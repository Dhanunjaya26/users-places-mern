import React, { useContext } from "react";

import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";

const NewPlace = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useContext(AuthContext);
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formData.inputs);

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify({
          title: formData.inputs.title.value,
          description: formData.inputs.description.value,
          address: formData.inputs.address.value,
          creator: userId,
        })
      );
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={formSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay className="center" />}
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
    </>
  );
};

export default NewPlace;
