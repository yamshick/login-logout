import { useState } from "react";
import styles from "./page.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginThunk, registerThunk } from "../store/reducers/auth-slice";
import { useDispatch } from "react-redux";

export const Registration = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const onRegister = async () => {
    setIsLoading(true);
    try {
      await dispatch(registerThunk({ name, login, password })).unwrap();
      setName("");
      setLogin("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoginDisabled = ![name, login, password, passwordConfirm].every(
    Boolean
  );

  const shouldShowErrorMessage =
    [password, passwordConfirm].every(Boolean) && password !== passwordConfirm;

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
          <div className={shouldShowErrorMessage}>
            Введенные пароли не совпадают
          </div>
          <Button
            disabled={isLoginDisabled || shouldShowErrorMessage}
            onClick={onRegister}
          >
            Зарегистрироваться
          </Button>
        </>
      )}
    </div>
  );
};
