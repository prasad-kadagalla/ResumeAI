import { useState } from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ScreeningModule from "./ScreeningModule";
import CandidateDetail from "./CandidateDetail";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("login")}>Login</button>{" "}
        <button onClick={() => setPage("dashboard")}>Dashboard</button>{" "}
        <button onClick={() => setPage("screening")}>Screening</button>{" "}
        <button onClick={() => setPage("candidate")}>Candidate</button>
      </nav>

      {page === "login" && <LoginPage />}
      {page === "dashboard" && <Dashboard />}
      {page === "screening" && <ScreeningModule />}
      {page === "candidate" && <CandidateDetail />}
    </div>
  );
}
