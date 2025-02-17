import React, { useState } from "react";
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from "./common/ProfileEdit";

const ProfileComponent = ({ currentUser }: any) => {
  const [isEdit, setisEdit] = useState(false);

  const onEdit = () => {
    setisEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  );
};

export default ProfileComponent;
