import { useState } from "react";
import { useEffect } from "react";
import ProfileComponent from "../Components/ProfileComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../Components/common/Loader";

const Profile = ({ currentUser }: any) => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res: any) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />;
};

export default Profile;
