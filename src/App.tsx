import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PlanBotPage from './pages/planbot/PlanBotPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/planbot" element={<PlanBotPage />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Home />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
