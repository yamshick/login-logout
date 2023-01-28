import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hashRoutes } from "../components/constants";

export const Profile = () => {
  const { isAuth, userName } = useSelector((state) => state.authReducer);

  return (
    <>
      {isAuth ? (
        <div>{`Hello ${userName}!`}</div>
      ) : (
        <Navigate to={hashRoutes.LOGIN} />
      )}
    </>
  );
};
