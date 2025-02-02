import React, { useEffect, useState } from "react";
import { UsersList } from "../components";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

        console.log("users ", data);
        setUsers(data.users);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const errorModalHandler = () => {
    setError(null);
  };

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <ErrorModal onCancel={errorModalHandler} error={error} />
      {!isLoading && users && <UsersList items={users} />}
    </>
  );
};

export default Users;
