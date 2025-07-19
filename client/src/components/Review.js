import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notecontext";

const Review = () => {
  const context = useContext(noteContext);
  const { setlogout, getuser } = context;
  let navigate = useNavigate();
  
  // State for placeholder and reviews
  const [placeholder, setPlaceholder] = useState('Loading...'); // Default placeholder
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    review: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.rating && formData.review) {
      setReviews([...reviews, formData]);  // Ensure name is added to the review
      setFormData({ name: "", rating: "", review: "" });  // Clear form after submission
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };

  useEffect(() => {
    const checkuser = async () => {
      if (localStorage.getItem("token")) {
        let response = await getuser();
        if (response && response.user.name) {
          setPlaceholder(response.user.name); // Set placeholder to the user's name
          setFormData(prevData => ({ ...prevData, name: response.user.name }));  // Set initial name in form data
        } else {
          setPlaceholder("Guest User");
        }
      } else {
        setlogout(true);
        navigate("/homepage");
      }
    };

    checkuser();
  }, [getuser, setlogout, navigate]);

  return (
    <div className="review-page">
      <div className="container">
        <h1 className="text-center my-4">Share Your Experience</h1>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder={placeholder} // Set dynamic placeholder value
              value={formData.name}  // Bind to formData.name
              onChange={handleChange}
              readOnly // If you want to keep it read-only
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating (1-5)
            </label>
            <select
              id="rating"
              name="rating"
              className="form-select"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="review" className="form-label">
              Your Review
            </label>
            <textarea
              id="review"
              name="review"
              className="form-control"
              rows="5"
              value={formData.review}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>

        <h2 className="my-4">User Reviews</h2>
        <div className="reviews">
          {reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <div key={index} className="card my-3">
                <div className="card-body">
                  <h5 className="card-title">{rev.name}</h5>  {/* Name should now show up here */}
                  <h6 className="card-subtitle mb-2 text-muted">
                    Rating: {rev.rating}/5
                  </h6>
                  <p className="card-text">{rev.review}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to share your experience!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
