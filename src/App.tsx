import Landing from "./containers/Landing";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./containers/Home";

function App() {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
