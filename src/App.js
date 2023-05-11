import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import UserList from "./Pages/UserList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="container-fluid main p-0">
      <BrowserRouter>
        <Header />
        <div className="main-inner">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
