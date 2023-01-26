import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

export const NavBar = () => {
  return (
    <Router>
      <div>
        <nav>
          <div>
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
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

function Main() {
  return <h2>Main</h2>;
}

function Login() {
  return <h2>Логин</h2>;
}
function Registration() {
  return <h2>Регистрация</h2>;
}

function Profile() {
  return <h2>Профайл</h2>;
}
