import { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/LinkedinLogo.png";
import "../Sass/LoginComponent.scss";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginComponent() {
  let navigate = useNavigate();

  const [credentails, setCredentials]: any = useState({});
  const login = async () => {
    try {
      let res: any = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please check your Credentials");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    console.log(response);
  };
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            type="email"
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            type="password"
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="Or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />

        <p className="gp-to-signup">
          New to Linkedin?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
