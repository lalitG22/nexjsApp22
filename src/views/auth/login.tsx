"use client";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const Login: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [snackBar, setSnakBar] = useState({
    message: "",
    open: false,
  });

  const login = async () => {
    if (!userRef.current?.value || !passRef.current?.value) {
      setSnakBar({
        ...snackBar,
        message: "Username or Password cannot be empt",
        open: true,
      });
    } else {
      const authResponse = await signIn("credentials", {
        redirect: false,
        username: userRef.current.value,
        password: passRef.current.value,
      });

      if (authResponse?.error) {
        setSnakBar({
          ...snackBar,
          message: authResponse?.error,
          open: true,
        });
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <section className="login">
      <img src="/loginSide.jpeg" alt="Picture of the author" />
      <div>
        <div className="loginHeader">Sign In</div>
        <div className="loginbody">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="inputText"
              ref={userRef}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="inputText"
              ref={passRef}
            />
          </div>
        </div>
        <div className="loginfooter">
          <Button variant="contained" onClick={login}>
           SignIn
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBar.open}
        autoHideDuration={100}
        message={snackBar.message}
      />
    </section>
  );
};

export default Login;
