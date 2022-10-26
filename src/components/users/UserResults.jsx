import React from "react";
import { useState, useContext } from "react";
import Spinner from "../layout/Spinner.jsx";
import UserItem from "./UserItem.jsx";
import GithubContext from "../../context/github/GithubContext.jsx";
function UserResults() {
  const { users, isLoading } = useContext(GithubContext);

  //comeback and look at this closely
  //since we are using async await we need a separate function

  if (!isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 ">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
