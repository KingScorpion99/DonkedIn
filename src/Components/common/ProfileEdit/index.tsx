import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { editProfile } from "../../../api/FirestoreAPI";
import "./index.scss";

const ProfileEdit = ({ onEdit, currentUser }: any) => {
  const [editInputs, setEditInputs]: any = useState({ currentUser });
  const getInput = (event: { target: { name: any; value: any } }) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.userID, editInputs);
    await onEdit();
  };
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <IoMdClose className="close-icon" onClick={onEdit} size={25} />
      </div>
      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />
        <label>Country</label>
        <input
          onChange={currentUser}
          className="common-input"
          placeholder="Country"
          value={editInputs.country}
          name="country"
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          value={editInputs.city}
          name="city"
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          value={editInputs.company}
          name="company"
        />
        <label>Industry</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Industry"
          value={editInputs.industry}
          name="industry"
        />

        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          value={editInputs.college}
          name="college"
        />
        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website"
          value={editInputs.website}
          name="website"
        />
        <label>About</label>
        <textarea
          className="common-textArea"
          placeholder="About Me"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Skills"
          value={editInputs.skills}
          name="skills"
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
