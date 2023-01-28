import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import styles from "./page.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { authSlice, loginThunk } from "../store/reducers/auth-slice";
import { hashRoutes } from "../components/constants";
import { Profile } from "./profile";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setIsAuth, setUserName } = authSlice.actions;

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(loginThunk({ login, password })).unwrap();
      console.log(res);
      if (res.error) {
        setErrorMessage(res.error?.message);
        throw new Error(res.error?.message);
      }
      const { name } = res;
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
          <div className={errorMessage ? "" : styles.hider}>{errorMessage}</div>
          <Button disabled={isLoginDisabled} onClick={onLogin}>
            Войти
          </Button>
        </>
      )}
    </div>
  );
};
