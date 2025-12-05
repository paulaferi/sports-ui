import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu/Menu";
import { Footer } from "./components/Footer/Footer";
import "./styles/layout.css";
import { TeamList } from "./pages/TeamList/TeamList";
import { TeamDetails } from "./pages/TeamDetails/TeamDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Menu />
        <main className="main">
          <Routes>
            <Route path="/" element={<TeamList />} />
            <Route path="/teams/:id" element={<TeamDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
