import React, { useEffect } from "react";

import "./PlaceForm.css";
import { useParams } from "react-router-dom";
import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world",
    imageUrl:
      "https://th.bing.com/th?id=OLC.lp5u7VeEyp0Iew480x360&w=210&h=140&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    address: "20 W 34th St, New York, NY 10001",
    Location: {
      lat: 40.7484,
      lng: -73.9857,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world",
    imageUrl:
      "https://th.bing.com/th?id=OLC.lp5u7VeEyp0Iew480x360&w=210&h=140&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    address: "20 W 34th St, New York, NY 10001",
    Location: {
      lat: 40.7484,
      lng: -73.9857,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const { placeId } = useParams();

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

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );
  }, [setFormData, identifiedPlace]);

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formData.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  if (!formData.inputs.title.value) {
    return (
      <div className="center">
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    formData.inputs.title.value && (
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
    )
  );
};

export default UpdatePlace;
