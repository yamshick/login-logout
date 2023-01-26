import styles from "./page.css";
import { Input } from "../components/input";
import { useState } from "react";
import { Button } from "../components/button";

export const Login = () => {
  const [password, setPassword] = useState("");

  return (
    <div className={styles.formContainer}>
      <Input onChange={console.log} type={"text"} placeholder={"Логин"} />
      <Input onChange={setPassword} type={"password"} placeholder={"Пароль"} />
      <Button>Войти</Button>
    </div>
  );
};
