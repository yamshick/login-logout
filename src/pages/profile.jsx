import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hashRoutes } from "../constants";
import { Button } from "../ui/button";
import { authSlice } from "../store/reducers/auth-slice";
import styles from "./page.css";

export const Profile = () => {
  const { isAuth, userName } = useSelector((state) => state.authReducer);
  const { setUserName, setIsAuth } = authSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(setIsAuth(false));
    dispatch(setUserName(null));
    navigate(hashRoutes.LOGIN);
  };
  return (
    <>
      {isAuth ? (
        <div className={styles.formContainer}>
          <div>{`Привет, ${userName}!`}</div>
          <Button onClick={onLogout}>Выйти</Button>
        </div>
      ) : (
        <Navigate to={hashRoutes.LOGIN} />
      )}
    </>
  );
};
