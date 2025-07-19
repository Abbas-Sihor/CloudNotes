import React from 'react';
import './HomePage.css'; // Assuming you have a CSS file for additional styling
import { useNavigate } from 'react-router-dom';
import UserReviews from './UserReviews';
import image from "./th.jpeg"

const HomePage = () => {
    const navigate=useNavigate()
    return (
        <>
        <div className="home-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <img src={image} alt="Note" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <div className="content">
                            <h1>Welcome to CloudNotes App!</h1>
                            <p className="lead">CloudNotes is a powerful note-saving application that allows you to store your notes securely on the cloud and access them from anywhere.</p>
                            <h2>Features:</h2>
                            <ul>
                                <li>Save your notes securely on the cloud</li>
                                <li>Access your notes from any device with an internet connection</li>
                                <li>Organize your notes with tags and categories</li>
                                <li>Share your notes with friends and colleagues</li>
                                <li>Customize the appearance of your notes</li>
                                <li>And much more!</li>
                            </ul>
                            <p>Ready to get started?</p>
                            <button className="btn btn-primary" variant="primary" onClick={() => { navigate("/signup") }}>Create an Account</button>
                            <p>Already have an account? <a href="/login">Log in here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <UserReviews/>
            </>
    );
};

export default HomePage;
