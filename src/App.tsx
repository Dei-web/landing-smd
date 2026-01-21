import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import WorkShop from "./pages/workshop";

export default function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/taller" element={<WorkShop />}/>
    </Routes>
  );
}
