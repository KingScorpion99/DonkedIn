import { useEffect, useState } from "react";
import "../Sass/ConnectionsComponent.scss";
import { getAllUsers, addConnection } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";

const ConnectionsComponent = ({ currentUser }: any) => {
  const [users, setUsers] = useState([]);
  const getCurrentUser = (id: any) => {
    addConnection(currentUser.id, id);
  };
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return users.length > 1 ? (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
          />
        );
      })}
    </div>
  ) : (
    <div className="connections-main">No Connections to Add!</div>
  );
};

export default ConnectionsComponent;
