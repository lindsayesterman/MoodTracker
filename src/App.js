import "./App.css";
import MoodTracker from "./MoodTracker/MoodTracker";
import { Route, Link } from "react-router-dom";
import Graph from "./Graph/Graph";

function App() {
  return (
    <div className="App">
      <Route
        exact path="/"
        render={(routeProps) => {
          return <MoodTracker />;
        }}
      />
      <Route
        path="/graph"
        render={(routeProps) => {
          return <Graph />;
        }}
      />
    </div>
  );
}

export default App;
