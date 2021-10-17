import "./App.css";
import ExcelTable from "./Components/ExcelTable";
import Header from "./Components/Header";
import ImportExcelFile from "./Components/ImportExcelFile";

function App() {
  return (
    <div>
      <Header />
      <div className="app">
        <ImportExcelFile />
        <ExcelTable />
      </div>
    </div>
  );
}

export default App;
