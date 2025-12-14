import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import CandidateDetail from "./CandidateDetail";
import ScreeningModule from "./ScreeningModule";

export default function App() {
  return (
    <div>
      <LoginPage />
      <hr />
      <Dashboard />
      <hr />
      <CandidateDetail />
      <hr />
      <ScreeningModule />
    </div>
  );
}
