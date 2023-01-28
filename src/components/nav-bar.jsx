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
import { hashRoutes } from "./constants";

export const NavBar = () => {
  return (
    <Router>
      <>
        <nav className={styles.nav}>
          {[
            { name: "Главная", link: hashRoutes.ROOT },
            { name: "Логин", link: hashRoutes.LOGIN },
            { name: "Регистрация", link: hashRoutes.REGISTRATION },
            { name: "Профиль", link: hashRoutes.PROFILE },
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
      </>
    </Router>
  );
};
