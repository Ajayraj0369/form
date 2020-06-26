import React, { useState } from "react";
import "../App.css";
import Authenticate from "./Authenticate";

const LoginPlain = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [isloggedin, setIsloggedin] = useState(false);

  const handleusername = (e) => setUsername(e.target.value);

  const handlepassword = (e) => setPassword(e.target.value);

  const logOut = (e) => {
    setIsloggedin(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const check = await Authenticate({ username, password });
      console.log(check);
      console.log(username);
      setIsloggedin(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrors("Incorrect login credentials");
      setIsloggedin(false);
      setTimeout(() => {
        setErrors("");
      }, 3000);
      setUsername("");
      setPassword("");
    }

    setLoading(false);
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

export default LoginPlain;
