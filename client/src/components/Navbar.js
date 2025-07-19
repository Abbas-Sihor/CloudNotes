import React,{useContext} from "react";
import { Link, useLocation,useNavigate ,} from "react-router-dom";
import noteContext from "../context/notes/notecontext";
import swal from 'sweetalert';
function Navbar() {
  const location = useLocation()
	let navigate= useNavigate()
	const context = useContext(noteContext);
  const { logout,setlogout} = context;
	const handlelogout= ()=>{
		swal({
			title: "Are you sure?",
			text: "Are you Willing To Logout?",
			icon: "warning",
			buttons: ["Cancel", "Yes"],
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				 setlogout(false)
				 navigate("/homepage")
				 localStorage.removeItem("token")
				 window.location.reload();
				
		}});
	}
	
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						CloudNotes
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className={`nav-link ${location.pathname=== "/"?"active":""}`} aria-current="page" to={localStorage.getItem('token')?"/":"/homepage"}>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className={`nav-link ${location.pathname==="/Review"?"active":""} `} to="/Review">
									Review
								</Link>
							</li>
						</ul>
						<form className="d-flex" role="search">
							{(!localStorage.getItem('token'))?<>
							<Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
							<Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
							</>:<Link className="btn btn-primary mx-1" onClick={handlelogout}  role="button">Logout</Link>}
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
