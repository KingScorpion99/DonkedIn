import { useState, useMemo, useEffect } from "react";
import {
  getSingleStatus,
  getSingleUser,
  editProfile,
} from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi2";
import "./index.scss";
import FileUploadModal from "../FileUploadModal";
import { useLocation } from "react-router-dom";
import { uploadImage as uploadImageAPI } from "../../../api/imageUpload";

const ProfileCard = ({ onEdit, currentUser }: any) => {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile]: any = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  interface props {
    id: number;
    name: string;
  }

  const getImage = (event: any) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.userID,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={currentUser?.imageLink}
              alt="profile-image"
            />
            <h3 className="username">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country}`
                : `${currentProfile?.city}, ${currentProfile?.country}`}
            </p>
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? `${currentUser.website}`
                : currentProfile?.website}
            </a>
          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <div>
          <p className="about-me">
            {Object.values(currentProfile).length === 0
              ? currentUser.aboutMe
              : currentProfile?.aboutMe}
          </p>

          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        </div>
      </div>

      <div>
        <div className="post-status-main">
          {allStatuses
            .filter((item: any) => {
              return item.userEmail === localStorage.getItem("userEmail");
            })
            .map((posts: any) => {
              return (
                <div key={posts.id}>
                  <PostsCard posts={posts} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
