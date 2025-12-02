import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header>
        <h1>Sports Teams</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>

      <main>
        <p>Welcome! Manage teams and players here.</p>
        <button onClick={() => setCount((c) => c + 1)}>Increase counter</button>
        <p>Counter: {count}</p>
      </main>

      <footer>
        <small>© {new Date().getFullYear()} Sports UI</small>
      </footer>
    </div>
  );
}

export default App;
