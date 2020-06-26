import React, { useState, useReducer } from "react";
import "../App.css";
import Authenticate from "./Authenticate";

function loginReducer(state, action) {
  switch (action.type) {
    case "form": {
      return {
        ...state,
        [action.feild]: action.value,
      };
    }
    case "login": {
      return {
        ...state,
        loading: true,
      };
    }
    case "sucess": {
      return {
        ...state,
        isloggedin: true,
      };
    }
    case "fail": {
      return {
        ...state,
        isloggedin: false,
        username: "",
        password: "",
        errors: "Incorrect login credentials",
        loading: false,
      };
    }
    case "logout": {
      return {
        ...state,
        isloggedin: false,
        username: "",
        password: "",
        loading: false,
      };
    }
    case "timeout": {
      return {
        ...state,
        errors: "",
      };
    }
  }
  return state;
}

const initialState = {
  username: "",
  password: "",
  loading: false,
  errors: "",
  isloggedin: false,
};

const Loginreducer = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { username, password, loading, errors, isloggedin } = state;

  const handleusername = (e) =>
    dispatch({ type: "form", feild: "username", value: e.target.value });

  const handlepassword = (e) =>
    dispatch({ type: "form", feild: "password", value: e.target.value });

  const logOut = (e) => {
    dispatch({ type: "logout" });
  };

  const submit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      const check = await Authenticate({ username, password });
      console.log(check);
      console.log(username);
      dispatch({ type: "sucess" });
    } catch (error) {
      dispatch({ type: "fail" });
      setTimeout(() => {
        dispatch({ type: "timeout" });
      }, 3000);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        {isloggedin ? (
          <>
            <h1> Hello {username}!</h1>
            <button onClick={logOut}>logg out</button>
          </>
        ) : (
          <form action="" className="form" onSubmit={submit}>
            {errors ? <p className="error">{errors}</p> : <p> Please Login</p>}
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={handleusername}
            />
            <br />
            <input
              type="number"
              placeholder="password"
              value={password}
              onChange={handlepassword}
            />
            <br />
            <button className="submit" type="submit" disabled={loading}>
              {loading ? "Loading" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Loginreducer;
