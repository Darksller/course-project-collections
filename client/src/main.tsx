import ReactDOM from "react-dom/client";
import "@/styles/global.css";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/index.ts";
import { I18nextProvider } from "react-i18next";
import i18next from "@/translations";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18next}>
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  </I18nextProvider>,
);
