import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import Register from "./pages/registerPage/Register";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/> } />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
