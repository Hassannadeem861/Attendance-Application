// import React from "react";
// import "./Login.css";
// import Button from "@mui/material/Button";
// import loginLogo from "../../Images/logo.jpg";

// const Login = () => {
//   return (
//     <div className="login">
//       <img src={loginLogo} alt="logo" className="logo" />
//       <form className="">
//         <input type="email" required placeholder="Enter your email" className="emailInput"/>
//         <br />
//         <input type="password" required placeholder="Enter your password" className="passwordInput" />
//         <br />
//         <Button variant="contained" sx={{margin: "0.5em", width: '120px'}}>Log in</Button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import "./Login.css";

import { GlobalContext } from "../../Context/context";

import { baseUrl } from "../../core";

const Login = () => {
  let { state, dispatch } = useContext(GlobalContext);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("");
      setErrorMessage("");
    }, 5000);
  }, [alertMessage, errorMessage]);

  const LoginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/login`,
        {
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "USER_LOGIN",
        payload: response.data.data,
      });

      console.log("resp: ", response?.data?.message);
      setAlertMessage(response?.data?.message);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>{JSON.stringify(state)}</div>

      <form id="loginForm" onSubmit={LoginSubmitHandler}>
        <label htmlFor="emailInput">Email:</label>
        <input
          ref={emailInputRef}
          type="email"
          autoComplete="email"
          name="emailInput"
          id="emailInput"
          required
        />

        <br />
        <label htmlFor="passwordInput">Password:</label>
        <input
          ref={passwordInputRef}
          type="password"
          autoComplete="current-password"
          name="passwordInput"
          id="passwordInput"
        />

        <br />

        <button type="submit">Login</button>

        <div className="alertMessage">{alertMessage}</div>
        <div className="errorMessage">{errorMessage}</div>
      </form>
    </div>
  );
};

export default Login;
