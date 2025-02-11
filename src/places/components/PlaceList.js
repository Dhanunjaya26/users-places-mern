import React from "react";
import { Card } from "../../shared/components/UIElements";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";
import { Button } from "../../shared/components/FormElements";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe you want to add some?</h2>
          <Button to="/places/new">Add Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
