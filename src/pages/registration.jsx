import { useState } from "react";
import styles from "./page.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginThunk, registerThunk } from "../store/reducers/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hashRoutes } from "../components/constants";

export const Registration = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuth } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(
        registerThunk({ name, login, password })
      ).unwrap();
      if (res.error) {
        setErrorMessage(res.error?.message);
        throw new Error(res.error?.message);
      }
      setName("");
      setLogin("");
      setPassword("");
      setPasswordConfirm("");
      setIsRegistered(true);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = () => {
    navigate(hashRoutes.LOGIN);
  };

  const isLoginDisabled = ![name, login, password, passwordConfirm].every(
    Boolean
  );

  const inputErrorMessage =
    [password, passwordConfirm].every(Boolean) &&
    password.substring(0, passwordConfirm.length) !== passwordConfirm &&
    password !== passwordConfirm;

  if (isAuth) return <Navigate to={hashRoutes.PROFILE} />;
  return (
    <div className={styles.formContainer}>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <>
          <Input onChange={setName} type={"text"} placeholder={"Имя"} />
          <Input onChange={setLogin} type={"text"} placeholder={"Логин"} />
          <Input
            onChange={setPassword}
            type={"password"}
            placeholder={"Пароль"}
          />
          <Input
            onChange={setPasswordConfirm}
            type={"password"}
            placeholder={"Подтвердите пароль"}
          />
          <div
            className={inputErrorMessage || errorMessage ? "" : styles.hider}
          >
            {inputErrorMessage && "Введенные пароли не совпадают"}
            {errorMessage}
          </div>
          <div className={isRegistered ? "" : styles.hider}>
            Регистрация прошла успешно
          </div>
          {isRegistered ? (
            <Button onClick={onLogin}>Войти</Button>
          ) : (
            <Button
              disabled={isLoginDisabled || inputErrorMessage}
              onClick={onRegister}
            >
              Зарегистрироваться
            </Button>
          )}
        </>
      )}
    </div>
  );
};
