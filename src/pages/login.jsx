import { useState } from "react";
import styles from "./page.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { loginThunk } from "../store/reducers/auth-slice";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onLogin = async () => {
    setIsLoading(true);
    try {
      await dispatch(loginThunk({ login, password })).unwrap();
      setLogin("");
      setPassword("");
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
