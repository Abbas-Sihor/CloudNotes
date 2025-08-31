import React, {useState,useContext}from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/notecontext";
import validation from './validation';
const Signup = () => {

	const context = useContext(noteContext);
  const {setlogout} = context;
  let navigate=useNavigate()
  const [credentials, setcredentials] = useState({name:'',email:'',password:''});
  const [error, seterror] = useState({name:'',email:'',password:''});
	const [loading,setLoading]=useState(false)


	const port = process.env.REACT_APP_PORT
	const handleSubmit=async (e)=>{
		e.preventDefault()
		setLoading(true)
			const error=(validation(credentials))
			seterror(error)
			if(Object.keys(error).length > 0){
				setLoading(false)
				return
			}
			const response = await fetch(`${port}api/auth/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    });
    const json= await response.json(); 
		console.log(json)
    if (json.success) {
			setLoading(false)
			localStorage.setItem('token' , json.token);
      setlogout(false)
      navigate("/")
    }
    else{
			setLoading(false)
			alert("login with correct credentials")
    }
		setLoading(false)
	}


const onchange=(e)=>{
	setcredentials({...credentials,[e.target.name]:e.target.value})
	
}





  return (
    <div className='container'>
			<h2 className='my-5'>Signup To Use CloudNotes--Your Notes On Cloud</h2>
      <form className="my-5" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Name
					</label>
					<input
            onChange={onchange}
						type="text"
						className="form-control"
						id="name"
						name="name"
						aria-describedby="emailHelp"
					/>
					{error.name&&<p style={{color:"red"}}>{error.name}</p>}
				</div>
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
					{error.email&&<p style={{color:"red"}}>{error.email}</p>}
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
					{error.password&& <p style={{color:"red"}}>{error.password}</p>}
				</div>

				<button type="submit" className="btn btn-primary"disabled={loading}>
					{loading?"Please wait":"Submit"}
				</button>
			</form>
			<p>Already have an account <a href="/login">Click here</a></p>
    </div>
  )
}

export default Signup
