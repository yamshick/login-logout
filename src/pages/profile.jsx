import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hashRoutes } from "../components/constants";

export const Profile = () => {
  const navigate = useNavigate();
  const { isAuth, userName } = useSelector((state) => state.authReducer);

  if (!isAuth) {
    console.log("Profile", { isAuth });
    navigate(hashRoutes.LOGIN);
  }

  return <div>{`Hello ${userName}!`}</div>;
};
