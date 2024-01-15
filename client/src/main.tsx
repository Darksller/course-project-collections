import ReactDOM from "react-dom/client";
import "@/styles/global.css";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <RouterProvider router={router} />
  </ThemeProvider>,
);
