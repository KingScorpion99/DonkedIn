import { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import LinkedinLogo from "../assets/LinkedinLogo.png";
import "../Sass/LoginComponent.scss";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUniqueID } from "../helpers/getUniqueId";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials]: any = useState({});
  const register = async () => {
    try {
      let res: any = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
          "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1788614524.1719792000&semt=ais_user",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    navigate("/home");
  };
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            type="text"
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            className="common-input"
            placeholder="Your Name"
          />
          <input
            type="email"
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            className="common-input"
            placeholder="Email or Phone number"
          />
          <input
            type="password"
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="Or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />

        <p className="gp-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
