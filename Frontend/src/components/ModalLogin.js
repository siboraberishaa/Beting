import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ModalLogin({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/live", { email, password })
      .then((res) => {
        if (res.data.user) {
          // Kontrollo nëse kthehet një përdorues
          navigate("/index");
        } else {
          alert("Login failed");
        }
      })

      .catch((err) => console.log(err));
  }

  return (
    <div className={`login-modal ${isOpen ? "active" : ""}`}>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="username"
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
          <button type="submit" className="submit-button">
            LOGIN
          </button>
          <button type="button" className="close-button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;
