import "./App.css";
import { TimelineDirectionProvider } from "./context/TimelineDirectionContext";
import PatientMedicalHistoryPage from "./pages/PatientMedicalHistoryPage";

function App() {
  return (
    <TimelineDirectionProvider>
      <PatientMedicalHistoryPage />
    </TimelineDirectionProvider>
  );
}

export default App;
