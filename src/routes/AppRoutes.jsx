import { Routes, Route, Navigate } from "react-router-dom";
import UniversitiesPage from "../pages/universities/UniversitiesPage";
import CurrencyPage from "../pages/currency/CurrencyPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/universities" replace />} />
      <Route path="/universities" element={<UniversitiesPage />} />
      <Route path="/currency" element={<CurrencyPage />} />
      <Route path="*" element={<Navigate to="/universities" replace />} />
    </Routes>
  );
}