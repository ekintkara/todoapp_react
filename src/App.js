import "./App.css";
import Header from "./components/Header";
import React, { useState } from "react";
import TodoTable from "./components/TodoTable";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`App ${darkMode && "dark-mode"}`} >
      <Header />
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode((darkMode) => !darkMode)}
        />
        Dark Mode
      </label>
      <TodoTable  />
    </div>
  );
}

export default App;
