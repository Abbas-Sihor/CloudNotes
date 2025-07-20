import React,{useState,useContext} from "react";
import {useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notecontext";

const Login = () => {
let navigate=useNavigate()
const context = useContext(noteContext);
const { logout,setlogout} = context;
const port = process.env.REACT_APP_PORT
  const [credentials, setcredentials] = useState({email:'',password:''});
	const handleClick=async (e)=>{
		e.preventDefault()
	  const response = await fetch(`${port}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json= await response.json(); 
		console.log(json)
    if (json.success) {
			setlogout(false)
      localStorage.setItem('token' , json.token);
      navigate("/")
    }
    else{
      alert("login with correct credentials")
    }
	}
	const onchange=(e)=>{
		setcredentials({...credentials,[e.target.name]:e.target.value})

	}




	return (
		<div className="container">
		<h2 className="my-5">Login To Contiune --- CloudNotes</h2>
			<form className="my-5">
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
            onChange={onchange}
						type="email"
						className="form-control"
						id="email"
						name="email"
						aria-describedby="emailHelp"
					/>
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
            onChange={onchange}
						type="password"
						className="form-control"
						id="password"
						name="password"
					/>
				</div>

				<button type="submit" className="btn btn-primary" onClick={handleClick}>
					Submit
				</button>
			</form>
			<p>Don't have an account <a href="/signup">Click here</a></p>
		</div>
	);
};

export default Login;
