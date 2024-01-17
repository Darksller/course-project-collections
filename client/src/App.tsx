import { Outlet } from "@tanstack/react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div className="font-cgr">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
