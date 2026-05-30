import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CVPage from "./pages/CVPage";
import ProjectsPage from "./pages/ProjectsPage";
import TechStacksPage from "./pages/TechStacksPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/cv" element={<CVPage />} />
              <Route path="/techstacks" element={<TechStacksPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pilot/login" element={<AdminLoginPage />} />
              <Route path="/pilot" element={<AdminPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
