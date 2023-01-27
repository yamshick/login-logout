import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Main } from "../pages/main";
import { Login } from "../pages/login";
import { Registration } from "../pages/registration";
import { Profile } from "../pages/profile";
import styles from "./nav-bar.css";

export const NavBar = () => {
  return (
    <Router>
      <nav className={styles.nav}>
        {[
          { name: "Главная", link: "/" },
          { name: "Логин", link: "/login" },
          { name: "Регистрация", link: "/registration" },
          { name: "Профиль", link: "/profile" },
        ].map(({ name, link }, idx) => (
          <div key={idx}>
            <div>
              <NavLink to={link}>{name}</NavLink>
            </div>
          </div>
        ))}
      </nav>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
};
