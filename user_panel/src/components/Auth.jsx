import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../AuthContext";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../utils/baseUrl";
const Auth = () => {
  const { authCheck } = useAuth();
  const navigate = useNavigate();
  const clientId =
    "712348172997-2nidak9kred0qfu7daifnknm1o973jms.apps.googleusercontent.com";

  const handleSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    if (credentialResponse.credential) {
      try {
        const response = await axios.post(
          `${BaseUrl}/auth/login`,
          { credential: credentialResponse.credential },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log(response.data);
        if (!response.data.role) {
          toast.error("Page is accessbile only for user");
          await axios.post(
            `${BaseUrl}/auth/login`,
            {},
            {
              withCredentials: true,
            }
          );
          navigate("/login");
          return;
        }
        if (response.status === 200) {
          await authCheck();
          console.log("Auth check");
          navigate("/");
          console.log("Login Success:", response.data);
          toast.success(
            "Google Login Success , you can request your certificate now"
          );
        } else {
          console.error("Login Failed:", response.data);
        }
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default Auth;
