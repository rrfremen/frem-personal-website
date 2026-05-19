import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CVPage from "./pages/CVPage";


function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cv" element={<CVPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
