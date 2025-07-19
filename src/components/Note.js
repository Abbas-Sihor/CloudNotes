import React, { useEffect ,useContext,useState , useRef} from "react";
import noteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import Addnotes from "./Addnotes";
import swal from 'sweetalert';

function Note() {
	const context = useContext(noteContext);
	const { notes, fetchnote, editnote,logout,setlogout} = context;
	let navigate=useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token")) {
			
			fetchnote();
		}
		else{
			setlogout(true)
			navigate("/homepage")

		}
	}, []);
	
	const [note, setNotes] = useState({title:"",description:"",tag:"general"});
	const [id, setid] = useState("");
	const handlesubmit=(e)=>{
		e.preventDefault()
		
			swal({
				title: "Are you sure?",
				text: " Are you willing to edit this Note?",
				icon: "warning",
				buttons: ["Cancel", "Yes"],
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete) {
				
					editnote(id,note.title,note.description,note.tag)
					Ref.current.click()
				
					
				} 
			});
		
		
	}
	const onchange=(e)=>{
		
    setNotes({ ...note, [e.target.name]: e.target.value });
    

	}
	const myRef = useRef(null);
	const Ref = useRef(null);
	const handleClick = (currrentnote) => {
		console.log(currrentnote._id)
		setNotes({title:currrentnote.title,description:currrentnote.description})
		setid(currrentnote._id)
    myRef.current.click();
  };

	return (
		<div className="row my-3">
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				ref={myRef}
				style={{display:"none"}}
			>
				Launch demo modal
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Modal title
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<form className="my-3">
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Title
						</label>
						<input
						value={note.title}
							type="text"
							className="form-control"
							id="title"
							name='title'
							onChange={onchange}
							aria-describedby="emailHelp"
						/>
					
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							description
						</label>
						<input
						value={note.description}
							type="text"
							className="form-control"
							id="description"
							name='description'
							onChange={onchange}
						/>
					</div>
					
					
				</form>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								ref={Ref}
							>
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={handlesubmit}>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
			<Addnotes />
			<h1>Your Notes</h1>
			<div className="container mx-1">
      {notes.length===0&& "No Notes To Display"}
			</div>
			{Array.isArray(notes) &&notes.map((notes) => {
				return <Noteitem key={notes._id} notes={notes} handleClick={handleClick} />;
			})}
		</div>
	);
}

export default Note;
