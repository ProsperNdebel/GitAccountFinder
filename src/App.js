import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/Notfound";
import { GithubProvider } from "./context/github/GithubContext.jsx";
import { AlertProvider } from "./context/alert/AlertContext.jsx";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";
function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="true">
            <div className="flex flex-col justify-between h-screen">
              <Navbar />
              <main className="container mx-auto px-3 pb-12">
                <Alert />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/user/:login" element={<User />} />
                  <Route path="/notfound" element={<NotFound />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
