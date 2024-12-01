import { Navigate, Route, Routes } from "react-router-dom";
import PhotoList from "./pages/PhotoList";
import PhotoDetail from "./pages/PhotoDetail";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/photos" />} />
        <Route path="/photos" element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route
          path="*"
          element={<h2 className="text-center">404 - Page Not Found</h2>}
        />
      </Routes>
    </>
  );
}

export default App;
