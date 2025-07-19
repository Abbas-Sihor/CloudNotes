import "./App.css";
import Navbar from "./components/Navbar"; 
import Home from "./components/Home"; 
import About from "./components/About";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Notestate from "./context/notes/Notestate";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import Review from "./components/Review";


function App() {
	return (
		<>
		
		<Notestate>
		<BrowserRouter>
		<Navbar/>
		<div className="container">
		<Routes>
      <Route  exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/homepage" element={<Homepage/>} />
      <Route exact path="/review" element={<Review/>} />
    </Routes>
		</div>
		</BrowserRouter>
		</Notestate>
		</>
	);
}

export default App;
