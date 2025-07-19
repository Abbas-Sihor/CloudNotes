import React ,{useContext} from 'react'
import noteContext from "../context/notes/notecontext"
import swal from 'sweetalert';
import { DateFormat } from './utils/DateFormat';




function Noteitem(props) {
	const { notes,handleClick } = props;
	const context = useContext(noteContext)
	const {deletenote }=context
	// console.log(notes._id)

   const warning=(id)=>{
	swal({
		title: "Are you sure?",
		text: "Once deleted, you will not be able to recover this Note",
		icon: "warning",
		buttons: ["Cancel", "Yes"],
		dangerMode: true,
	})
	.then((willDelete) => {
		if (willDelete) {
			deletenote(id)
			swal("Poof! Your Note has been deleted!", {
				icon: "success",
			});
		} else {
			
		}
	});
}
	return (
		<>
		<div className="col-md-3">
			<div className="card my-3">
				<div className="card-body">
					<h5 className="card-title">{notes.title}</h5>
					<p className="card-text">{notes.description}</p>
					<p>Created At <span>{DateFormat(notes.date)}</span></p>
          <i className="fa-solid fa-pen-to-square mx-3 " onClick={()=>{handleClick(notes)}}></i>
          <i className="fa-solid fa-trash" onClick={()=>{warning(notes._id)}}></i>

				</div>
			</div>
		</div>
		</>
	);
}

export default Noteitem;
