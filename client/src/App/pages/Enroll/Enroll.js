import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

import enrollImg from "../../assets/enroll.webp";
import successImg from "../../assets/success.webp";

import "./Enroll.css";

const Enroll = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const batchOptions = [
    { value: "6-7 AM", label: "6-7 AM" },
    { value: "7-8 AM", label: "7-8 AM" },
    { value: "8-9 AM", label: "8-9 AM" },
    { value: "5-6 PM", label: "5-6 PM" },
  ];

  const Success = () => (
    <div className="success">
      <div>
        <img src={successImg} alt="success" />
        <Link to="/" className="btn-primary">
          <p className="hello">Home</p>
        </Link>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name) {
      return setError("Name is required");
    }

    if (!email) {
      return setError("Email is required");
    }

    if (!age) {
      return setError("Age is required");
    }

    if (!batch.value) {
      return setError("Batch is required");
    }

    if (age < 18 || age > 65) {
      return setError("Age must be between 18-65 years");
    }

    setError("");

    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, age, batch: batch.value }),
    };

    const res = await fetch(
      "http://localhost:3001/api/v1/user/enroll",
      requestOptions
    );
    const response = await res.json();

    if (response.status === "success") {
      setName("");
      setEmail("");
      setAge("");
      setBatch("");
      setError("");
      setShowSuccess(true);
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      {showSuccess ? (
        <Success />
      ) : (
        <div className="Enroll">
          <div className="container">
            <div className="left">
              <p className="heading">Register For Yoga Class</p>
              <p className="error">{error}</p>
              <form onSubmit={handleSubmit} className="formedit">
                <div className="inputContainer">
                  <div className="inputCon">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="input"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="inputCon">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="input"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <div className="inputCon">
                    <input
                      type="number"
                      className="input"
                      placeholder="Enter Age"
                      name="dateOfBirth"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="inputCon">
                    <Select
                      className="select"
                      placeholder="Select Batch"
                      value={batch}
                      onChange={setBatch}
                      options={batchOptions}
                      styles={{
                        control: (styles) => ({
                          ...styles,
                          background: "#FFF",
                          outline: "1px solid #333",
                          borderRadius: "5px",
                          width: "240px",
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className="inputContainer">
                  <button type="submit" className="btn">
                    Enroll
                  </button>
                </div>
              </form>
            </div>
            <div className="right">
              <img src={enrollImg} alt="Enroll" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Enroll;
