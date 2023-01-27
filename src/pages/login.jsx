import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import styles from "./page.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { authSlice, loginThunk } from "../store/reducers/auth-slice";
import { hashRoutes } from "../components/constants";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state) => state.authReducer);
  const { setIsAuth, setUserName } = authSlice.actions;

  if (isAuth) {
    console.log("Login", { isAuth });
    navigate(hashRoutes.PROFILE);
  }
  const onLogin = async () => {
    setIsLoading(true);
    try {
      const { name } = await dispatch(loginThunk({ login, password })).unwrap();
      console.log(name);
      setLogin("");
      setPassword("");
      dispatch(setIsAuth(true));
      dispatch(setUserName(name));
      navigate(hashRoutes.PROFILE);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoginDisabled = ![login, password].every(Boolean);
  return (
    <div className={styles.formContainer}>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <>
          <Input onChange={setLogin} type={"text"} placeholder={"Логин"} />
          <Input
            onChange={setPassword}
            type={"password"}
            placeholder={"Пароль"}
          />
          <Button disabled={isLoginDisabled} onClick={onLogin}>
            Войти
          </Button>
        </>
      )}
    </div>
  );
};
