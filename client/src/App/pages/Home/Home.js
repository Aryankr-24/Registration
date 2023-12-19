import React from "react";
import { Link } from "react-router-dom";

// Importing Images
import yogaImg from "../../assets/yogaimage.jpg";

// Importing Styles
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <div className="container">
        <div className="left">
          <h1>Welcome to your Yoga Classes Registration.</h1>
          <p>
            You can not change your slot within the same month!
          </p>
          <div className="button-container">
            <Link to="/enroll" className="btn-primary">
              Enroll For The Yoga Class
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={yogaImg} alt="yogaImg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
