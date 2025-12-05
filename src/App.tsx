import { BrowserRouter } from "react-router-dom";
import { Menu } from "./components/Menu/Menu";
import { Footer } from "./components/Footer/Footer";
import { Body } from "./components/Body/Body";
import type { Team, Player } from "./types";
import "./styles/layout.css";

const mockTeam: Team = { id: 1, name: "Lions FC", city: "Maribor" };

const mockPlayers: Player[] = [
  { id: 1, name: "Ana", position: "FW", number: 9 },
  { id: 2, name: "Sara", position: "MF", number: 8 },
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Menu />
        <main>
          <Body team={mockTeam} players={mockPlayers} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
