import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BoussoleChat from './components/BoussoleChat';
import Home from './pages/Home';
import VoixActif from './pages/VoixActif';
import ParentsHome from './pages/ParentsHome';
import ParentsFiche from './pages/ParentsFiche';
import GuideDroits from './pages/GuideDroits';
import DecodeurPia from './pages/DecodeurPia';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voixactif" element={<VoixActif />} />
            <Route path="/parents" element={<ParentsHome />} />
            <Route path="/parents/droits" element={<GuideDroits />} />
            <Route path="/parents/decodeur" element={<DecodeurPia />} />
            <Route path="/parents/:troubleId" element={<ParentsFiche />} />
          </Routes>
        </div>
        <Footer />
        <BoussoleChat />
      </div>
    </BrowserRouter>
  );
}
