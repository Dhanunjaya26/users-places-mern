import React, { useEffect, useState } from "react";
import { PlaceList } from "../components";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const userId = useParams().userId;
  const [places, setPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest]);

  const deleteHandler = (placeId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== placeId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && places && (
        <PlaceList items={places} onDelete={deleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
