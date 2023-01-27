import styles from "./app.css";
import { NavBar } from "./components/nav-bar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { Registration } from "./pages/registration";
import { Profile } from "./pages/profile";

export const App = () => (
  <div className={styles.app}>
    <NavBar />
  </div>
);
