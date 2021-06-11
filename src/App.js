import "./App.css";
import FormSelection from "./components/FormSelection";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12">
              <h1>Fill-a-Form</h1>
            </div>
            <FormSelection />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
