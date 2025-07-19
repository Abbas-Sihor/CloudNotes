export default function validation(credentials){
  const errors={}
  if (credentials.name===""){
    errors.name="Name is required"
  }
  const email_pattern=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (credentials.email===""){
    errors.email="Email is required"
  }
  else{
    if (!email_pattern.test(credentials.email)){
      errors.email="Email Dosen't match"
    }
  }
  const passwordPattern = /^.{8,}$/;
  if (credentials.password===""){
    errors.password="password is required"
  }
  else{
    if (!passwordPattern.test(credentials.password)){
      errors.password="password should be of 8 charecter"
    }
  }
  return(errors)
}