import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu/Menu";
import { Footer } from "./components/Footer/Footer";
import { TeamList } from "./pages/TeamList/TeamList";
import { TeamDetails } from "./pages/TeamDetails/TeamDetails";
import "./styles/layout.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Menu />
        <main className="main">
          <Routes>
            <Route path="/" element={<TeamList />} />
            <Route path="/team/:id" element={<TeamDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
