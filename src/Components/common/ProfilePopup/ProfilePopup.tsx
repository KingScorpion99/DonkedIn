import React, { useMemo, useState } from "react";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";

export const ProfilePopup = () => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser]: any = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <p className="name">{currentUser.name}</p>
      <p className="headline">{currentUser.headline}</p>
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: { id: currentUser?.id },
          })
        }
      />

      <Button title="Log out" onClick={onLogout} />
    </div>
  );
};
