import React ,{useContext,useState} from 'react'
import noteContext from "../context/notes/notecontext"
import notesvalidation from './notesvalidation';


const Addnotes = () => {
	
	const context = useContext(noteContext)
	const {addnote }=context
	const [notes, setNotes] = useState({title:"",description:"",tag:"general"});
	const [error, seterror] = useState({name:'',email:'',password:''});
	const handlesubmit=(e)=>{
		e.preventDefault()
		const error = notesvalidation(notes)
		seterror(error)
		if(Object.keys(error).length > 0){
			return
		}
		addnote(notes.title,notes.description,notes.tag)
		setNotes({title:"",description:""})
		console.log(notes)
	}
	const onchange=(e)=>{
		setNotes({...notes,[e.target.name]:e.target.value})

	}
  return (
    <div className="containere my-3">
				<h1 className='my-5'>Add A Note</h1>
				<form className="my-3">
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Title
						</label>
						<input
						value={notes.title}
							type="text"
							className="form-control"
							id="title"
							name='title'
							onChange={onchange}
							aria-describedby="emailHelp"
						/>
						{error.title&&<p style={{color:"red"}}>{error.title}</p>}
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							description
						</label>
						<input
						value={notes.description}
							type="text"
							className="form-control"
							id="description"
							name='description'
							onChange={onchange}
						/>
						{error.description&&<p style={{color:"red"}}>{error.description}</p>}
					</div>
					<div className="mb-3 form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="exampleCheck1"
						/>
						<label className="form-check-label" htmlFor="exampleCheck1">
							Check me out
						</label>
					</div>
					<button type="submit" onClick={handlesubmit} className="btn btn-primary" disabled={notes.title<5 || notes.description<5}>
						Submit
					</button>
				</form>
          </div>
  )}

export default Addnotes
