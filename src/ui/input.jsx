import styles from "./input.css";
import { useState } from "react";

export const Input = ({ onChange, ...props }) => {
  const [value, setValue] = useState("");

  const onInputChange = (event) => {
    const { value } = event.target;
    setValue(value);
    onChange && onChange(value);
  };
  return (
    <input
      onChange={onInputChange}
      value={value}
      className={styles.inputItem}
      {...props}
    />
  );
};
