import {useEffect, useState} from "react";
import styles from "./page.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginThunk, registerThunk } from "../store/reducers/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hashRoutes } from "../constants";

export const Registration = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuth } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!login) {setErrorMessage('')}
  }, [login])

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
      console.log('---------------------')
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

  const isRegisterButtonDisabled = ![name, login, password, passwordConfirm].every(
    Boolean
  );

  const inputErrorMessage =
    [password, passwordConfirm].every(Boolean) &&
    // password.substring(0, passwordConfirm.length) !== passwordConfirm &&
    password !== passwordConfirm;

  if (isAuth) return <Navigate to={hashRoutes.PROFILE} />;
  return (
    <div className={styles.formContainer}>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <>
          <Input value={name} onChange={setName} type={"text"} placeholder={"Имя"} />
          <Input value={login} onChange={setLogin} type={"text"} placeholder={"Логин"} />
          <Input
              value={password}
            onChange={setPassword}
            type={"password"}
            placeholder={"Пароль"}
          />
          <Input
              value={passwordConfirm}
            onChange={setPasswordConfirm}
            type={"password"}
            placeholder={"Подтвердите пароль"}
          />
          <div
            className={errorMessage ? "" : styles.hider}
          >
            {errorMessage}
          </div>
          <div
              className={inputErrorMessage ? "" : styles.hider}
          >
            {inputErrorMessage && "Введенные пароли не совпадают"}
          </div>
          <div className={isRegistered ? "" : styles.hider}>
            Регистрация прошла успешно
          </div>
          {isRegistered ? (
            <Button onClick={onLogin}>Войти</Button>
          ) : (
            <Button
              disabled={isRegisterButtonDisabled || inputErrorMessage}
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
