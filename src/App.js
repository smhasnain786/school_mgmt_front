import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import TasksPage from "./pages/TasksPage";
import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    
    <BrowserRouter>
     <Toaster position="top-right" />
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/students" element={
          <PrivateRoute><StudentsPage /></PrivateRoute>
        } />

        <Route path="/tasks" element={
          <PrivateRoute><TasksPage /></PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;