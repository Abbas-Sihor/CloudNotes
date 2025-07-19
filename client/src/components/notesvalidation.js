export default function notesvalidation(notes){
  const errors={}
  const titlePattern = /^.{3,}$/;
  if (notes.title===""){
    errors.title="title is required"
  }
  else{
    if (!titlePattern.test(notes.title)){
      errors.title="title should be of minimum 3 charecter"
    }
  }
 
  const descriptionPattern = /^.{5,}$/;
  if (notes.description===""){
    errors.description="description is required"
  }
  else{
    if (!descriptionPattern.test(notes.description)){
      errors.description="description should be of minimum 5 charecter"
    }
  }
  return(errors)
}