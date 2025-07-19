import React from 'react';
import "./userpage.css"

const UserReviews = () => {
    return (
        <section className="user-reviews">
            <div className="container">
                <h2>Discover What Our Users Have to Says</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <p className="card-text">"Amazing note-taking app! It has made my life so much easier. Highly recommended!"</p>
                                <p className="card-text"><strong>- John Doe</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <p className="card-text">"Simple, intuitive, and powerful. MyNote is the best note-taking tool I've used."</p>
                                <p className="card-text"><strong>- Jane Smith</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <p className="card-text">"I've been using MyNote for months now, and it's become an essential part of my daily routine. Love it!"</p>
                                <p className="card-text"><strong>- Michael Johnson</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserReviews;
