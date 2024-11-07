import logoGC from './logoGC.png';
import './App.css';
import AdminDashboard from "./adminDashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoGC} className="App-logo" alt="logo" />
        <AdminDashboard />
      </header>
    </div>
  );
}

export default App;
