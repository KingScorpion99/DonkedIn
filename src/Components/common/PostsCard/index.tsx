import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import "./index.scss";
import { Modal } from "antd";

const PostsCard = ({ posts, id, getEditData }: any) => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser]: any = useState({});
  const [allUsers, setAllUsers]: any = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.userID, posts.userID, setIsConnected);
  }, [currentUser.userID, posts.userID]);

  return isConnected || currentUser.userID === posts.userID ? (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.userID === posts.userID ? (
          <div className="action-container">
            <BiPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BiTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}
        <img
          className="profile-image"
          alt="profile-image"
          src={
            allUsers
              .filter((item: any) => item.id === posts.userID)
              .map((item: any) => item.imageLink)[0]
          }
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user: any) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {
              allUsers.filter((user: any) => user.id === posts.userID)[0]
                ?.headline
            }
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : (
        <></>
      )}

      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.userID}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
};

export default PostsCard;
