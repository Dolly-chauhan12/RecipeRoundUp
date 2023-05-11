import Home from "./containers/Home"
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
