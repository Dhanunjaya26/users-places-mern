import React, { useContext, useEffect, useState } from "react";

import "./PlaceForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { Card } from "../../shared/components/UIElements";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const { placeId } = useParams();
  const [placeDetails, setPlaceDetails] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setPlaceDetails(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, setFormData]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formData.inputs);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          title: formData.inputs.title.value,
          description: formData.inputs.description.value,
        })
      );
      navigate(`/${placeDetails.creator}/places`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!placeDetails && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {!isLoading && formData.inputs.title.value && (
        <form className="place-form" onSubmit={updateSubmitHandler}>
          <Input
            type="text"
            label="Title"
            id="title"
            element="input"
            errorMessage="Please enter a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={formData.inputs.title.value}
            initialIsValid={formData.inputs.title.isValid}
          />
          <Input
            type="text"
            label="Description"
            id="description"
            element="textarea"
            errorMessage="Please enter a valid description (min 5 characters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initialValue={formData.inputs.description.value}
            initialIsValid={formData.inputs.description.isValid}
          />
          <Button disabled={!formData.isValid}>Update Place</Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
