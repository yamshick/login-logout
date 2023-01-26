import styles from "./page.css";
import { Input } from "../components/input";
import { useState } from "react";
import { Button } from "../components/button";

export const Registration = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const shouldShowErrorMessage =
    password && passwordConfirm && password !== passwordConfirm;
  return (
    <div className={styles.formContainer}>
      <Input onChange={console.log} type={"text"} placeholder={"Имя"} />
      <Input onChange={console.log} type={"text"} placeholder={"Логин"} />
      <Input onChange={setPassword} type={"password"} placeholder={"Пароль"} />
      <Input
        onChange={setPasswordConfirm}
        type={"password"}
        placeholder={"Подтвердите пароль"}
      />
      {shouldShowErrorMessage && <div>Введенные пароли не совпадают</div>}
      <Button>Зарегистрироваться</Button>
    </div>
  );
};
