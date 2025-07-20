import React, { useState } from "react";
import noteContext from "./notecontext";

const host =process.env.REACT_APP_PORT

const notesinitial = [];
const userinitial = [];

const Notestate = (props) => {
	const [notes, setNotes] = useState(notesinitial);
	const [user, setUser] = useState(userinitial);
  const [logout,setlogout]=useState(false)
  


  //fetch all notes

  const fetchnote=async()=>{
    const response = await fetch(`${host}api/note/fetchallnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      
    });
    const json=await response.json(); 
    // console.log(json)
    setNotes(json)
    
  }

   //Addiong A note
   
	const addnote = async (title, description, tag) => {


    const response = await fetch(`${host}api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    });
    const note=await response.json(); 
		setNotes(notes.concat(note));
	};

  // Deleting a note

	const deletenote = async(id) => {

    const response = await fetch(`${host}api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      }
    });



		const newnotes = notes.filter((note) => note._id!== id);
		setNotes(newnotes);
		console.log("Notes DEleted Successdfully", id);
	};

  // editing a note

	const editnote = async (id, title, description, tag) => {

    const response = await fetch(`${host}api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=response.json(); 

    let newnotes=JSON.parse(JSON.stringify(notes))

		for (let index = 0; index < newnotes.length; index++) {
			const element =newnotes[index];
			if (element._id === id) {
        console.log("coming inside")
				newnotes[index].title = title;
				newnotes[index].description = description;
				newnotes[index].tag = tag;
        break
			}
		}
    setNotes(newnotes)
	};

  // Get user detail

  const getuser=async()=>{
    const response = await fetch(`${host}api/auth/getuser`, {
      method: "POST",
      headers: {
        
        "auth-token":localStorage.getItem("token")
      },
      
    });
    const json=await response.json(); 
    return json
    
  }
  

	return (
		<noteContext.Provider
			value={{ notes, setNotes, addnote, deletenote, editnote,fetchnote,logout,setlogout,getuser,user }}>
			{props.children}
		</noteContext.Provider>
	);
};

export default Notestate;
