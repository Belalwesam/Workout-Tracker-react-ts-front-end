import { useState, createContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

//interfaces
interface IPayload {
  register: { email: string; password: string; password_confirmation: string };
  login: {
    email: string;
    password: string;
  };
}

export const AuthContext = createContext({} as any);
const AuthContextProvider = (props: any) => {
  //states
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userActive, setUserActive] = useState<boolean>(false);
  //effects
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserActive(true);
    } else {
      setUserActive(false);
    }
  }, []);
  //functions
  //register function
  const register = (payload: IPayload["register"]) => {
    setLoading(true);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/register`,
      data: {
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      },
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setUserActive(true);
        navigate("/");
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  };

  const login = (payload: IPayload["login"]) => {
    setLoading(true);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/login`,
      data: {
        email: payload.email,
        password: payload.password,
      },
    })
      .then((res) => {
        if (res.data.status === 401) {
          setError(true);
        } else {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          setUserActive(true);
          navigate("/");
        }
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  };
  const logout = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/logout`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setError(false);
        setLoading(false);
        setUserActive(false);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  let value = {
    login,
    register,
    loading,
    error,
    userActive,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
