import "./App.css";
import { Board } from "./components/Board/Board";
import { Card } from "./components/Card/Card";
import { BoardProvider } from "./context/board";

function App() {
  return (
    <div className="App">
      <BoardProvider>
        <Board>
          <Card name="carta 1" />
          <Card name="carta 2" />
          <Card name="carta 3" />
        </Board>
      </BoardProvider>
    </div>
  );
}

export default App;
