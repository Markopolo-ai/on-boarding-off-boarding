import './App.css';
import InviteMember from "./components/InviteMember";
import RemoveMember from "./components/RemoveMember";
import Home from "./components/Home"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/invite" component={InviteMember} />
          <Route path="/remove" component={RemoveMember} />
        </div>
      </Router>
    </div>
  );
}

export default App;
