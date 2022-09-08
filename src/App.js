  
import { Button } from "antd";
import "./App.css";
import Header from "./components/Header";


import TodoTable from "./components/TodoTable";

function App() {
  return (
    <div>
      <Header/>
      
      <TodoTable />
    </div>
  );
}

export default App;
