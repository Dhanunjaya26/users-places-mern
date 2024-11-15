import React from "react";
import { PlaceList } from "../components";
import { useParams } from "react-router-dom";

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

const UserPlaces = () => {
  const userId = useParams().userId;
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={places} />;
};

export default UserPlaces;
