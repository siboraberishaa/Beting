import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { Button } from "antd";

function ModalLogin({ isOpen, onClose }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation()

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
        const res = await login({ userName, password }).unwrap()
        dispatch(setCredentials({...res, }))
        onClose()
        setUserName('')
        setPassword('')
    } catch (error) {
        console.log(error?.data?.message || error.error)
    }
}

  return (
    <div className={`login-modal ${isOpen ? "active" : ""}`}>
      <div className="login-content">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="userName"
            id="userName"
            autocomplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <Button loading={isLoading} disabled={!userName && !password} type="submit" className="submit-button">
            LOGIN
          </Button>
          <button type="button" className="close-button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;
